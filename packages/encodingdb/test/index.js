import { pipe } from 'ramda'
import abstract from '@vidalii/encapsulatedb'
import encoding from '../src'
import { json, utf8 } from '../src/codecs'
const leveldown = require('leveldown')
const levelup = require('levelup')
test()
async function test() {
    const instanceDB = pipe(
        leveldown,
        levelup,
        abstract,
        encoding({
            keyEncoding: utf8.keyEncoding,
            valueEncoding: json.valueEncoding
        })
    )('./testDB')
    // console.log('instanceDB::',instanceDB)
    let putResponse = await instanceDB.put('abc', { hello: 'world' })
    console.log('putResponse::', putResponse)

    let getResponse = await instanceDB.get('abc')
    console.log('getResponse::', getResponse)

    let streamResponse = await instanceDB.createReadStreamP({
        onData: console.log,
        keys: true,
        values: false
    })

    let iteratorResponse = await instanceDB.iteratorP({
        onData: console.log,
        keys: false,
        values: true,
        // encode: false
    })
}