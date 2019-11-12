//@flow
import { compose, pipe, omit } from 'ramda'
import { evol } from '@vidalii/evol'

// import * as globalFxs from './globalFxs'
//resulse globalFxs {standarizedResponse,...}
import db from './fxs/db'
// import db_encode from './trash2/db_encode'
import db_up from './fxs/db.up'

import db_encoder from './fxs/db.encoder'
import db_encoder_many from './fxs/db.encoder.many'
import db_encode_docs from './fxs/db.encoder.docs'
import db_encode_rev from './fxs/db.encoder.rev'
import db_encode_seq from './fxs/db.encoder.seq'
import db_add_tac from './fxs/db.crud.tac'

import query_stream from './fxs/db.crud.query.stream'
import models_seq_config from './fxs/models.seq.config'
import models_seq from './fxs/models_seq'
import models_rev from './fxs/models_rev'

const fs = require('fs-extra')

/*::
type TableInput = {
  fxs: any,
  config: any
};
type TableOutput = ()=>any;
type ModelsInput = {
  table: any,
  fxs:any,
  config:any
};
type ModelsOutput = ()=>any
*/

// const table = (globalData /*: TableInput */) /*: TableOutput */ => compose(
//   db_add_tac(globalData),//tryAndCatch
//   db_up,
//   // db_encode(globalData),
//   db
// )(globalData)

// const fxs_db = ['db', parent => evol(
//   ['db', db],
//   ['db_up', db_up],
//   ['db_add_tac', db_add_tac]
// )(c => c.db_add_tac)({ parent })
// ]
const init_db = evol(
  ['db', db],
  ['db_up', db_up]
)(c => c.db_up)

const encoders = parent =>
  evol(
    ['db_encoder', db_encoder],
    ['db_encoder_many', db_encoder_many],
    ['docs', db_encode_docs],
    ['rev', db_encode_rev],
    ['seq', db_encode_seq],
    ['default', () => db_encoder()()]
  )(
    omit(['parent', 'db_encoder', 'db_encoder_many'])
  )({ parent })

const table = (globalData/*: TableInput */) /*: TableOutput */ => evol(
  [
    'table', parent =>
      evol(
        ['init_db', init_db],
        ['encoders', encoders],
        ['db_add_tac', db_add_tac],
        // ['db_add_queryStream', query_stream]
      )(
        c => c.db_add_tac
      )({ parent })
  ]
)(
  children => children.table
)(globalData)



const models = (globalData/*: ModelsInput */) /*: ModelsOutput */ =>
  evol(
    // ['query_stream', query_stream],
    ['models_seq', parent => evol(
      ['models_config', models_seq_config],
      ['test', data => {
        console.log(data)
      }]
      // ['model', models_seq],
    )(children => children)({ parent })
    ],
    // ['seq', models_seq],
    // ['rev', models_initTablerev]
  )(
    children => ({
      seq: children.models_seq
    })
  )
    (globalData)

// const instanceModels = models({
//     db: instanceTable,
//     ...globalData
// }).then(
//     r => {
//         // console.log('instanceModels::', r)
//     }
// )

export {
  table,
  models
}


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