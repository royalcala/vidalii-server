//@flow
import { omit, keys, pipe, toPairs, map, reduce, compose, curry, assoc } from 'ramda'
import { evol, evolCompose } from '@vidalii/evol'

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

import { configTable } from './example_init_data'
import { standarizedResponse } from './globalFxs'


const fs = require('fs-extra')

const evolComposeReturnNews = (...branchs) => (initialParents = {}) =>
  evolCompose(...branchs)(
    allObjects => omit(keys(initialParents), allObjects)
  )(initialParents)

const evolComposeReturnTop = (...branchs) => (initialParents = {}) => {
  var nameTop = branchs[0][0]
  return evolCompose(...branchs)(
    allObjects => allObjects[nameTop]
  )(initialParents)
}
const curryTop = (top, ...otherFxs) => (initData) => {
  const curryTop = curry(top)
  const wrapOthers = map(
    fx => {
      return fxCurry => fxCurry(fx)
    }
  )(otherFxs)

  return pipe(
    (init) => curryTop(init),
    ...wrapOthers
  )(initData)
}

// console.log(
//   'curryTop:',
//   curryTop(
//     (init, a, b) => init+a()+b(),
//     a => 'a',
//     b => 'b'
//   )('hola')
// )

// const evolCurryWithTop = pipe(
//   ()=>(a,b)=>b+a,
//     R.curry,
//     (curry)=>curry('a'),
//     (curry)=>curry('b')
//   )('')
//   console.log(pip)

// const testEvolComposeReturnTop = evolComposeReturnTop(
//   ['1', () => 'dataOne'],
//   ['2', evolComposeReturnNews(
//     ['2.1', () => 'data2.1'],
//     [2.2, evolComposeReturnNews(
//       ['2.2.1', () => 'data2.2.1']
//     )
//     ]
//   )
//   ]
// )({
//   config: 'parentData'
// })
// console.log('testEvolComposeReturnTop::', testEvolComposeReturnTop)

// const testComposeReturnNews = evolComposeReturnNews(
//   ['1', () => 'dataOne'],
//   ['2', evolComposeReturnNews(
//     ['2.1', () => 'data2.1'],
//     [2.2, evolComposeReturnNews(
//       ['2.2.1', () => 'data2.2.1']
//     )
//     ]
//   )
//   ]
// )({
//   config: 'parentData'
// })

// console.log('testComposeReturnNews::', testComposeReturnNews)


const tableFinal = evolComposeReturnNews(
  ['table', () => ({
    //One
    insertOne: '',
    updateOne: '',
    getOne: '',
    findOne: ''
    //Many
  })],
  ['models', evolComposeReturnNews(
    ['docs', () => 'data2.1'],
    ['seq', () => 'data2.1'],
    ['rev', () => 'data2.1'],
    ['tools', evolComposeReturnNews(
      ['2.2.1', () => 'data2.2.1']
    )
    ]
  )
  ],
  ['db',
    evolComposeReturnTop(
      ['db_levelup', () => 'levelUP'],
      //in memory
      //in leveldown
      //in browser
      ['db', evolComposeReturnTop(
        ['tables', ({ assoc_cond, config, }) =>
          reduce(
            assoc_cond,
            {},
            toPairs(config.tables)
          )
        ],
        ['assoc_cond', ({ cond_typeDB }) =>
          (acc, [tableName, tableConfig]) =>
            assoc
        ],

      )]
    )
  ]
)({
  config: configTable,
  standarizedResponse
})

console.log('tableFinal::', tableFinal)
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


// const table = evolCompose(
//   //Table
//   ['table', ({ models }) => ({
//       insertOne: ({ _id, ...dataToInsert })/*: InsertOne*/ => '',
//       updateOne: ({ _id, _rev, ...dataToUpdate })/*: UpdateOne*/ => ''
//   })],
//   //Models
//   ['models', () => {

//   }],
//   //model
//   ['dbs_extended', evolCompose(
//       ['query']
//   )],
//   ['dbs', () => compose(
//       //levelup
//       //leveldown||memory||browser
//   )]
// )

const init_db = evol(
  ['db', db],
  ['db_up', db_up]
)(c => c.db_up)

const encoders = evol(
  ['db_encoder', db_encoder],
  ['db_encoder_many', db_encoder_many],
  ['docs', db_encode_docs],
  ['rev', db_encode_rev],
  ['seq', db_encode_seq],
  ['default', () => db_encoder()()]
)(
  omit(['parent', 'db_encoder', 'db_encoder_many'])
)

const table = (globalData/*: TableInput */) /*: TableOutput */ => evol(
  [
    'table', parent =>
      evol(
        ['init_db', init_db],

        ['withCrudPlugins',
          evol(
            ['encoders', encoders],
            ['db_add_tac', db_add_tac],
            ['db_add_queryStream', query_stream]
          )(
            c => c.db_add_queryStream
          )
        ]
      )(
        c => c.withCrudPlugins
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