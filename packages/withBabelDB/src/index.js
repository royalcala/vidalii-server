//@flow
import { compose, pipe } from 'ramda'
import { evol, evolCompose, evolPipe } from '@vidalii/evol'

// import * as globalFxs from './globalFxs'
//resulse globalFxs {standarizedResponse,...}
import db from './fxs/db'
import db_encode from './fxs/db_encode'
import db_up from './fxs/db_up'
import db_o_tac from './fxs/db_o_tac'

import models_seq from './fxs/models_seq'

const fs = require('fs-extra')

// console.log('evolCompose::',evolCompose)
// console.log(globalFxs)
// const globalData = {
//     standarizedResponse,
//     config: initialData()
// }
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

const table = (globalData /*: TableInput */) /*: TableOutput */ => compose(
  db_o_tac(globalData),//tryAndCatch
  db_up,
  db_encode(globalData),
  db
)(globalData)


const models = (globalData/*: ModelsInput */) /*: ModelsOutput */ => evolCompose(
  // models_o_rev,
  ['seq', models_seq]
)(
  selection => ({
    seq: selection.seq
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