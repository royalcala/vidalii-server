console.clear()
console.log('in versioningdb')
import { pipe } from 'ramda'
import encapsulatedb from '@vidalii/encapsulatedb'
import encapsulatedbextend from '@vidalii/encapsulatedbextend'
import versioningdb from '../src'
// import encoding from '@vidalii/encodingdb'
// import { json, utf8 } from '../src/codecs'
const leveldown = require('leveldown')
const levelup = require('levelup')
test()
async function test() {
    // const instanceDB = await pipe(
    //     leveldown,
    //     levelup,
    //     // encapsulatedb,
    //     // encapsulatedbextend
    //     versioningdb({})
    //     // encoding({
    //     //     keyEncoding: utf8.keyEncoding,
    //     //     valueEncoding: json.valueEncoding
    //     // })
    // )('./testDB')
    const db = await encapsulatedb({ store: leveldown, location: './testDB' })
    const instanceDB = versioningdb({})(db)
    // console.log('instanceDB::', instanceDB)
    let { _id, _rev } = await instanceDB.put({ hello: 'world' })
    // console.log('_id::', _id)
    // console.log('_rev::', _rev)
    console.log('*******GET*********')
    // let getResponse = await instanceDB.get({ _id, encodedRev: _rev })
    let getResponse = await instanceDB.get(_id)
    console.log('getResponse::', getResponse)

    // let streamResponse = await instanceDB.createReadStreamP({
    //     onData: console.log,
    //     keys: true,
    //     values: false
    // })

    // let iteratorResponse = await instanceDB.iteratorP({
    //     onData: console.log,
    //     keys: false,
    //     values: true,
    //     // encode: false
    // })
}