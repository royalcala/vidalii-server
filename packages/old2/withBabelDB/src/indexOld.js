import {
  omit, __, cond, pipe, toPairs, map, reduce, compose, curry, assoc,
  is, split, keys, assocPath, over, lensPath,
  then
} from 'ramda'
import { evol, evolCompose } from '@vidalii/evol'
import { configTable as config } from './example_init_data'
// import { standarizedResponse } from './globalFxs'
import responses_standard from './fxs/responses.standard'
import fxEncoder from './fxs/encoder'
import db from './fxs/db'
import levelup from './fxs/db._u.levelup'
// import tac from './fxs/db[n].tac'
import tac_put from './fxs/db[n].tac.put'
import tac_get from './fxs/db[n].tac.get'
import tac_del from './fxs/db[n].tac.del'
import encoder_rev from './fxs/db.rev.encoder'
import encoder_seq from './fxs/db.seq.encoder'
import encoder_docs from './fxs/db.docs.encoder'
import query_iterator from './fxs/db[n].query.iterator'
import query_stream from './fxs/db[n].query.stream'

///revision
import model_rev_insertNextDocRev from './fxs/model.rev.insertNextDocRev'
import model_rev_insertOne from './fxs/model.rev.insertOne'
import model_rev_lastDocRev from './fxs/model.rev.lastDocRev'


import model_seq_store_counter from './fxs/model.seq.store.counter'
import model_seq_insertNextSeq from './fxs/model.seq.insertNextSeq'

import model_docs_insertOne from './fxs/model.docs.insertOne'
const fs = require('fs-extra')




//init object: inito.js
//wrap all:wa
//wrap object: wo
//add object: ao

//init::NO NEEDED
//->return a new object called with the name  init(['name',fx()])
//wrapAll:wa
//->return the same object name, wrapped with a compose wrapAll(new,old)::fx(new(old))
//wrapObject: wo
//->return the same object name, with some objects wrapped, wrapObject([[path],[path]],[fx1->path, fx2->path])
//addObj: ao
//->return the object with new one or news one addObject([[object1Path],[object2Path]],[fx1,fx2])
const wrapAll = wrapperFx => prevFx => compose(
  wrapperFx
)(prevFx)


const updateOne = curry((path, fx, obj) => {
  const ifPathIsString = () => assocPath(split('.', path), fx(obj), obj)
  const ifPathIsArray = () => assocPath(path, fx(obj), obj)
  return cond([
    [is(String), ifPathIsString],
    [Array.isArray, ifPathIsArray],
  ])(path)
})

const insertOne = curry((paths, fxs, curriedData) => {
  const checkIfIsString = (path) => typeof paths === 'string'

  const ifPathRootIsString = () => assocPath(split('.', paths), fxs(curriedData), curriedData)
  const ifRootPathIsArray = () => paths.reduce(
    (acc, path, index) => {
      if (checkIfIsString(path))
        return assocPath(split('.', path), fxs[index](curriedData), acc)
      else
        return assocPath(path, fxs[index](curriedData), acc)
    },
    curriedData
  )

  return cond([
    [Array.isArray, ifRootPathIsArray],
    [is(String), ifPathRootIsString]
  ])(paths)
})

const insertOneP = curry(async (paths, fxs, curriedData) => {
  var resultFx = await fxs(curriedData)
  return assocPath(split('.', paths), resultFx, curriedData)
  // const checkIfIsString = (path) => typeof paths === 'string'

  // const ifPathRootIsString = () => assocPath(split('.', paths), fxs(curriedData), curriedData)
  // const ifRootPathIsArray = () => paths.reduce(
  //   (acc, path, index) => {
  //     if (checkIfIsString(path))
  //       return assocPath(split('.', path), resultFx, acc)
  //     else
  //       return assocPath(path, resultFx, acc)
  //   },
  //   curriedData
  // )

  // return cond([
  //   [Array.isArray, ifRootPathIsArray],
  //   [is(String), ifPathRootIsString]
  // ])(paths)
})


const evolSimple = compose
const table = evolSimple(
  //---------model--------
  then(
    evolSimple(
      insertOne('model.docs.insertOne', model_docs_insertOne),

      insertOne('model.seq.insertNextSeq', model_seq_insertNextSeq)
    )
  ),
  //-->insertOneP with promise
  insertOneP('model.seq.store.counter', model_seq_store_counter),
  //model.rev
  insertOne('model.rev.insertNextDocRev', model_rev_insertNextDocRev),
  insertOne('model.rev.insertOne', model_rev_insertOne),
  insertOne('model.rev.lastDocRev', model_rev_lastDocRev),



  //------db--------
  ...['rev', 'seq', 'docs'].map(
    n => insertOne(`db.${n}.query.stream`, query_stream(n))
  ),

  ...['rev', 'seq', 'docs'].map(
    n => insertOne(`db.${n}.query.iterator`, query_iterator(n))
  ),
  //try and catch tac.put, get, del
  ...['rev', 'seq', 'docs'].map(
    n => insertOne(`db.${n}.tac.del`, tac_del(n))
  ),
  ...['rev', 'seq', 'docs'].map(
    n => insertOne(`db.${n}.tac.get`, tac_get(n))
  ),
  ...['rev', 'seq', 'docs'].map(
    n => insertOne(`db.${n}.tac.put`, tac_put(n))
  ),

  insertOne('db.docs.encoder', encoder_docs),
  insertOne('db.seq.encoder', encoder_seq),
  insertOne('db.rev.encoder', encoder_rev),

  ...['rev', 'seq', 'docs'].map(
    n => updateOne(`db.${n}`, levelup(n))
  ),

  ...['rev', 'seq', 'docs'].map(
    n => insertOne(`db.${n}`, db(n))
  ),
  insertOne('encoder', fxEncoder),
  insertOne('responses.standard', responses_standard)
)

// const table = evolSimple(
//   insertOne('encoder', fxEncoder),
//   ...['rev', 'seq', 'docs'].map(
//     n => insertOne(`db.${n}`, db(n))
//   ),
//   ...['rev', 'seq', 'docs'].map(
//     n => updateOne(`db.${n}`, levelup(n))
//   ),
//   //encoders
//   insertOne('db.docs.encoder', encoder_docs),
//   insertOne('db.seq.encoder', encoder_seq),
//   insertOne('db.rev.encoder', encoder_rev),
//   //try and catch tac.put, get, del
//   ...['rev', 'seq', 'docs'].map(
//     n => insertOne(`db.${n}.tac.del`, tac_del(n))
//   ),
//   ...['rev', 'seq', 'docs'].map(
//     n => insertOne(`db.${n}.tac.get`, tac_get(n))
//   ),
//   ...['rev', 'seq', 'docs'].map(
//     n => insertOne(`db.${n}.tac.put`, tac_put(n))
//   ),
//   ...['rev', 'seq', 'docs'].map(
//     n => insertOne(`db.${n}.query.stream`, query_stream(n))
//   ),
//   //model.rev
//   insertOne('model.rev.insertOne', model_rev_insertNextDocRev),
//   //-->insertOneP with promise
//   insertOneP('model.seq.store.counter', model_seq_store_counter),
//   then(
//     evolSimple(
//       ///model.seq.get(by table_id, seq to search)
//       insertOne('model.seq.insertOne', s)
//     )
//   )
// )
// ({
//   config,
//   fxs: { standarizedResponse }
// })

// console.log(
//   'table:',
//   table.db.seq.query.stream
// )

// var test = (async () => {
//   var _seq = 0
//   var lastSeq = await table.db.seq.query.stream({
//     query: {
//       keys: true,
//       values: true,
//       gt: config.uuid,
//       lt: config.uuid + '\xff',
//       limit: 1,
//       reverse: true
//     },
//     decoderOuts: {
//       key: true,
//       value: true
//     },
//     onData: (key) => {
//       console.log(key)
//     }
//   })

// })()


export default async ({ config, fxs }) => {
  var instanceTable = await table({ config, fxs })
  // console.log(Object.keys(instanceTable.response))
  // console.log('response.standard::', instanceTable.response.standard)
  return {
    table: '',
    model: instanceTable.model,
    db: instanceTable.db
  }
}