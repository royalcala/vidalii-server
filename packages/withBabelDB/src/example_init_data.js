const path = require('path')
// console.log(path.join(__dirname, '../')+'db_testing')
const completePathDB = path.join(__dirname, '../') + 'db_testing'
export const configTable = {
    // alias: 'test1',
    _id_table: '591bb671-15a8-4bb8-84ef-5904271745a8',
    env: {
        type: 'node',//browser||node
        encoding: {
            // key: '',
            value: 'json'//must be default and unique in json
        },
        pathdb: {
            backend: completePathDB
        },
        // nodeConfig: {
        //     pathdb: __dirname + '/testingdata'
        // },
        // browserConfig: {

        // }
    },
    tables: {
        docs: {
            //typeDb:[
            // 'inMemory:backend&&fronted',
            // 'leveldb:backend',
            // 'leveljs:browser'
            // ]
            // typeDb: 'inMemory',
            typeDb: 'inStorage',
            path: completePathDB,

        },
        rev: {
            typeDb: 'inStorage',
            path: completePathDB
        },
        seq: {
            typeDb: 'inStorage',
            path: completePathDB,
        },
    },
    // replication: {
    //     byDatabase: [
    //         { db: '', from: true, to: false }
    //     ],
    //     byFx: [
    //         { fx: (doc) => '' }
    //     ]
    // }
}