import {
  omit, __, cond, pipe, toPairs, map, reduce, compose, curry, assoc,
  is, split, keys, assocPath, over, lensPath
} from 'ramda'
import { evol, evolCompose } from '@vidalii/evol'
import { configTable as config } from './example_init_data'
import { standarizedResponse } from './globalFxs'
import fxEncoder from './fxs/encoder'
import db from './fxs/db'
import levelup from './fxs/db._u.levelup'
import tac from './fxs/db[n].tac'
import encoderRev from './fxs/db.rev.encoder'
import encoderSeq from './fxs/db.seq.encoder'
import encoderDocs from './fxs/db.docs.encoder'
// import tace from './fxs/TRASH_db[n]._i.tace'
import queryStream from './fxs/db[n].query.stream'
import modelRevInsertOne from './fxs/model.rev.insertOne'

import modelSeqStoreCounter from './fxs/model.seq.store.counter'
import modelSeqInsertOne from './fxs/model.seq.insertOne'

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



const evolSimple = compose
const table = evolSimple(
  //table
  //model.seq
  insertOne('model.seq.insertOne', modelSeqInsertOne),
  // insertOne('model.seq.store.counter', modelSeqStoreCounter),
  //model.rev
  insertOne('model.rev.insertOne', modelRevInsertOne),

  //try and catch with encoders
  // insertOne('db.docs.tace', tace('docs')),
  // insertOne('db.seq.tace', tace('seq')),
  // insertOne('db.rev.tace', tace('rev')),

  insertOne('db.docs.query.stream', queryStream('docs')),
  insertOne('db.seq.query.stream', queryStream('seq')),
  insertOne('db.rev.query.stream', queryStream('rev')),




  //try and catch tac.put, get, del
  insertOne('db.docs.tac', tac('docs')),
  insertOne('db.seq.tac', tac('seq')),
  insertOne('db.rev.tac', tac('rev')),

  //define encoder defaults
  insertOne('db.docs.encoder', encoderDocs),
  insertOne('db.seq.encoder', encoderSeq),
  insertOne('db.rev.encoder', encoderRev),

  updateOne('db.docs', levelup('docs')),
  updateOne('db.seq', levelup('seq')),
  updateOne('db.rev', levelup('rev')),

  insertOne('db.docs', db('docs')),
  insertOne('db.seq', db('seq')),
  insertOne('db.rev', db('rev')),

  insertOne('encoder', fxEncoder)
)
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


export default ({ config, fxs }) => {
  var instanceTable = table({ config, fxs })

  return {
    table: '',
    model: '',
    db: instanceTable.db
  }
}