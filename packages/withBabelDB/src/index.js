import {
  omit, __, cond, pipe, toPairs, map, reduce, compose, curry, assoc,
  is, split, keys, assocPath, over, lensPath,
  then, evolve
} from 'ramda'
import { evol, evolCompose } from '@vidalii/evol'
import { configTable as config } from './example_init_data'
// import { standarizedResponse } from './globalFxs'
// import responses_standard from './fxs/responses.standard'
// import fxEncoder from './fxs/encoder'
// import db from './fxs/db[n]'
// import levelup from './fxs/db[n]|levelup'
// import tac_put from './fxs/db[n].tac.put'
// import tac_get from './fxs/db[n].tac.get'
// import tac_del from './fxs/db[n].tac.del'
// import query_iterator from './fxs/db[n].query.iterator'
// import query_stream from './fxs/db[n].query.stream'
// import encoder_rev from './fxs/db.rev.encoder'
// import encoder_seq from './fxs/db.seq.encoder'
// import encoder_docs from './fxs/db.docs.encoder'

// import model_seq_store_counter from './fxs/model.seq.store.counter'
// import model_seq_insertNextSeq from './fxs/model.seq.insertNextSeq'

// import model_rev_insertNewDoc from './fxs/model.rev.insertNewDoc'
// import model_rev_getLastDocRev from './fxs/model.rev.getLastDocRev'

// ///revision
// import model_rev_insertNextDocRev from './fxs/model.rev.insertNextDocRev'



// import model_docs_insertOne from './fxs/model.docs.insertOne'
// const fs = require('fs-extra')

// const wrapAll = wrapperFx => prevFx => compose(
//   wrapperFx
// )(prevFx)


// const updateOne = curry((path, fx, obj) => {
//   const ifPathIsString = () => assocPath(split('.', path), fx(obj), obj)
//   const ifPathIsArray = () => assocPath(path, fx(obj), obj)
//   return cond([
//     [is(String), ifPathIsString],
//     [Array.isArray, ifPathIsArray],
//   ])(path)
// })

// const insertOne = curry((paths, fxs, curriedData) => {
//   const checkIfIsString = (path) => typeof paths === 'string'

//   const ifPathRootIsString = () => assocPath(split('.', paths), fxs(curriedData), curriedData)
//   const ifRootPathIsArray = () => paths.reduce(
//     (acc, path, index) => {
//       if (checkIfIsString(path))
//         return assocPath(split('.', path), fxs[index](curriedData), acc)
//       else
//         return assocPath(path, fxs[index](curriedData), acc)
//     },
//     curriedData
//   )

//   return cond([
//     [Array.isArray, ifRootPathIsArray],
//     [is(String), ifPathRootIsString]
//   ])(paths)
// })

// const insertOneP = curry(async (paths, fxs, curriedData) => {
//   var resultFx = await fxs(curriedData)
//   return assocPath(split('.', paths), resultFx, curriedData)
// })

// const evolSimple = pipe
// const table = evolSimple(
// insertOne('encoder', fxEncoder),
// insertOne('responses.standard', responses_standard),
// ...['rev', 'seq', 'docs'].map(
//   n => insertOne(`db.${n}`, db(n))
// ),
// ...['rev', 'seq', 'docs'].map(
//   n => insertOne(`db.${n}`, levelup(n))
// ),
// insertOne('db.docs.encoder', encoder_docs),
// insertOne('db.seq.encoder', encoder_seq),
// insertOne('db.rev.encoder', encoder_rev),
// ...['rev', 'seq', 'docs'].map(
//   n => insertOne(`db.${n}.tac.put`, tac_put(n))
// ),
// ...['rev', 'seq', 'docs'].map(
//   n => insertOne(`db.${n}.tac.get`, tac_get(n))
// ),
// ...['rev', 'seq', 'docs'].map(
//   n => insertOne(`db.${n}.tac.del`, tac_del(n))
// ),
// ...['rev', 'seq', 'docs'].map(
//   n => insertOne(`db.${n}.query.iterator`, query_iterator(n))
// ),
// ...['rev', 'seq', 'docs'].map(
//   n => insertOne(`db.${n}.query.stream`, query_stream(n))
// ),
// insertOneP('model.seq.store.counter', model_seq_store_counter),
// then(
//   evolSimple(
//     insertOne('model.seq.insertNextSeq', model_seq_insertNextSeq),
//     insertOne('model.rev.getLastDocRev', model_rev_getLastDocRev),
//     insertOne('model.rev.insertNewDoc', model_rev_insertNewDoc),
//     //update rev

//     //table is docs
//   )
// ),
// )
var storeLevel = require('leveldown')
var levelup = require('levelup')


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