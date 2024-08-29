import 'react-native-get-random-values';
import PouchDB from 'pouchdb-core';
import HttpPouch from 'pouchdb-adapter-http';
import replication from 'pouchdb-replication';
import mapreduce from 'pouchdb-mapreduce';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import PouchdbFind from 'pouchdb-find';

export default PouchDB.plugin(HttpPouch)
    .plugin(replication)
    .plugin(mapreduce)
    .plugin(SQLiteAdapterFactory)
    .plugin(PouchdbFind);

