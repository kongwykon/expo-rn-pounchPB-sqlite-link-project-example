import { CrudModule } from './crud.module';
import PouchDB from './db';

export function testDB() {
    console.log('Testing DB');
    const db = new PouchDB('mydb.db', { adapter: 'react-native-sqlite' })

    CrudModule.insert(db, "menu", { name: "xiao", age: 20, phone: "123456" })
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });

    CrudModule.find(db, "menu", { "age": 20 })
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });;
}