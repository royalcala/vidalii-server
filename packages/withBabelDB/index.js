// import evol from './evol'
console.clear()
console.log('clearing console...')
import { compose, pipe } from 'ramda'
// import { evol } from '@vidalii/evol'
import db from './fxs/db'
// import up_db from './fxs/up_db'
import db_encode from './fxs/db_encode'
import db_up from './fxs/db_up'
import db_o_tac from './fxs/db_o_tac'
import models_seq from './fxs/models_seq'
// import stateSeq from './fxs/stateSeq'
// import stateRev from './fxs/stateRev'
// // import stateDocs from './fxs/stateDocs'
// import crud_getOne from './fxs/crud_getOne'
// import crud_insertOne from './fxs/crud_insertOne'
// import crud_queue from './fxs/crud_queue'

import test_db from './fxs/db/index.test'
import test_db_encode_up from './fxs/db_up/index.test'
import test_db_encode_up_crud from './fxs/db_o_tac/index.test'
// import test_stateRev from './fxs/stateRev/index.test'
// import test_stateSeq from './fxs/stateSeq/index.test'
// // import test_crud_insertOne from './fxs/crud_insertOne/index.test'
// import test_queue from './fxs/crud_queue/index.test'
// // import test_stateDocs from './fxs/stateDocs/index.test'
// import test_crud_insertOne from './fxs/crud_insertOne/index.test'


const fs = require('fs-extra')

const standarizedResponse = ({ error = null, data = null }) => {
    //log errors
    return {
        data,
        error
        // ...(error === null ? {} : { error })
    }
}
const initialData = () => ({
    // alias: 'test1',
    uuid: '591bb671-15a8-4bb8-84ef-5904271745a8',
    env: {
        type: 'node',//browser||node
        encoding: {
            // key: '',
            value: 'json'//must be default and unique in json
        },
        pathdb: {
            backend: __dirname + '/db_testing'
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
            path: __dirname + '/db_testing'
        },
        rev: {
            typeDb: 'inStorage',
            path: __dirname + '/db_testing'
        },
        seq: {
            typeDb: 'inStorage',
            path: __dirname + '/db_testing'
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
})
const globalData = {
    standarizedResponse,
    config: initialData()
}

const table = globalData => compose(
    db_o_tac(globalData),//tryAndCatch
    db_up,
    db_encode(globalData),
    db
)(globalData)

// const table = globalData => pipe(
//     db,
//     db_encode(globalData),
//     db_up,
//     db_o_tac(globalData),//tryAndCatch
// )(globalData)
const instanceTable = table(
    globalData
)
// console.log(
//     'instanceTable::',
//     instanceTable.docs.tac.put
// )
// console.log(
//     'keys::',
//     Object.keys(instanceTable.docs.tac)
// )
// instanceTable.docs.tac.put('name', 'levelup', function (err) {
//     if (err) return console.log('Ooops!', err) // some kind of I/O error
//     // 3) Fetch by key
//     instanceTable.docs.get('name', function (err, value) {
//         if (err) return console.log('Ooops!', err) // likely the key was not found
//         // Ta da!
//         console.log('name=' + value)
//     })
// })
// instanceTable.docs.tac.put('1', { holis: 'holis1' }).then(
//     async response => {
//         console.log('response:', response)
//         var get = await instanceTable.docs.tac.get('1')
//         console.log('get:', get)
//     }
// )
const models = globalData => compose(
    // models_o_rev,
    models_seq
)(globalData)
const instanceModels = models({
    db: instanceTable,
    ...globalData
}).then(
    r => {
        console.log('instanceModels::', r)
    }
)




// const getFxs = () => ([
//     //added on initial value
//     // [
//     //     'config',
//     //     (initialValue) => initialValue,
//     // ],
//     [
//         'standarizedResponse',
//         () => ({ error = null, data = null }) => {
//             //log errors
//             return {
//                 data,
//                 error
//                 // ...(error === null ? {} : { error })
//             }
//         }
//     ],
//     [
//         'db',
//         db
//     ],
//     // //only one instance by db is supported with levelup
//     // // [
//     // //     'up_db',
//     // //     up_db
//     // // ],
//     [
//         'db_encode',
//         db_encode
//     ],
//     [
//         'db_encode_up',
//         db_encode_up
//     ],
//     [
//         'db_encode_up_crud',
//         db_encode_up_crud
//     ],
//     // [
//     //     'crud_queue',
//     //     crud_queue
//     // ],
//     // [
//     //     'crud_getOne',
//     //     crud_getOne
//     // ],
//     // [
//     //     'stateSeq',
//     //     stateSeq
//     // ],
//     // [
//     //     'stateRev',
//     //     stateRev
//     // ],
//     // [
//     //     'crud_insertOne',
//     //     crud_insertOne
//     // ],
//     ...test_db,
//     // ...test_queue,
//     [
//         'test_db_encode_up',
//         test_db_encode_up
//     ],
//     ...test_db_encode_up_crud
//     // ...test_stateRev,
//     // ...test_stateSeq,
//     // ...test_crud_insertOne

// ])
// const processEvol = ({ fxs, initialData }) => {
//     var resultEvol = evol(...fxs)(
//         all => all
//     )({
//         config: initialData
//     })
//     return resultEvol
// }

// const removeDataBase = ({ pathDB }) => {
//     // console.log('pathDb::', pathDB)

//     if (fs.existsSync(pathDB)) {
//         var removed = fs.removeSync(pathDB)
//         var existDir = fs.existsSync(pathDB)
//         test(`database path was removed in ${pathDB}`, () => {
//             expect(existDir).toEqual(false);
//         })
//     }

// }

// describe('root', () => {
//     removeDataBase({ pathDB: initialData().tables.docs.path })
//     removeDataBase({ pathDB: initialData().tables.rev.path })
//     removeDataBase({ pathDB: initialData().tables.seq.path })

//     var result = processEvol({
//         fxs: getFxs(),
//         initialData: initialData()
//     })
//     test('resultEvol is a Object?', () => {
//         expect(result).toEqual(expect.any(Object));
//     })

// })