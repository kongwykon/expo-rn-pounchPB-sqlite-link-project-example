import { ObjectId } from "bson";

export class CrudModule {
  // 新增数据
  public static async insert(db: any, tableName: string, info: any) {
    console.log("insert", info);
    // 若新增数据里没有_id,需生成
    try {
      if(!info.hasOwnProperty("_id")){
        const _id=new ObjectId().toString();
        info["_id"]=_id;
      }else{
        info["_id"]=`${info["_id"]}`;
      }
      info["tableName"] = tableName;
      return await db.put(info);
    } catch (err) {
      throw err;
    }
  }

  // 条件查询符合条件的单个数据
  public static async findOne(db: any, tableName: string, condition: Object | any) {
    console.log("findOne", condition);
    // 创建索引
    await db.createIndex({ index: { fields: ["type"] } });
    condition["tableName"] = tableName;
    let indexId = "";
    const keys = Object.keys(condition);
    if (keys.length > 0) {
      const createIndexResult = await db.createIndex({ index: { fields: keys } }) as any;
      indexId = createIndexResult.id;
    }
    const findResult = await db.find({ selector: condition, limit: 1 });

    for (const index of (await db.getIndexes()).indexes) {
      if (index.ddoc == indexId) {
        db.deleteIndex(index as any);
      }
    }
    return findResult;
  }

  public static async find(db: any, tableName: string, condition: Object | any) {
    // 创建索引
    await db.createIndex({ index: { fields: ["type"] } });
    condition["tableName"] = tableName;
    let indexId = "";
    const keys = Object.keys(condition);
    if (keys.length > 0) {
      const createIndexResult = await db.createIndex({ index: { fields: keys } }) as any;
      indexId = createIndexResult.id;
    }
    const findResult = await db.find({ selector: condition });

    for (const index of (await db.getIndexes()).indexes) {
      if (index.ddoc == indexId) {
        db.deleteIndex(index as any);
      }
    }
    return findResult;
  }


  // 根据条件修改单条数据
  public static async updateOne(db: any, tableName: string, condition: Object, updateInfo: Object | any) {
    let info = await this.findOne(db, tableName, condition);
    if (info.docs.length > 0) {
      for (const key of Object.keys(updateInfo)) {
        (info.docs[0] as any)[`${key}`] = updateInfo[`${key}`];
      }
      //  return info.docs[0];
      return await db.put(info.docs[0]);
    }
  }

  public static async getIndexes(db: any) {
    return await db.getIndexes();
  }

}
