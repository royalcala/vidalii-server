import { pipe } from 'ramda'
import abstract from '@vidalii/abstractlevel'
import sublevel from '../src'
const leveldown = require('leveldown')
const levelup = require('levelup')
test()
async function test() {
    const instanceDB = pipe(
        leveldown,
        levelup,
        abstract,
        sublevel({ prefix: 'rev' })
    )('./testDB')
    let putResponse = await instanceDB.put('abc', '0123')
    console.log('putResponse::', putResponse)

    let getResponse = await instanceDB.get('abc', { asBuffer: false })
    console.log('getResponse::', getResponse)

    let streamResponse = await instanceDB.createReadStreamP({
        onData: console.log,
    })

    let iteratorResponse = await instanceDB.iteratorP({
        onData: console.log,
        keyAsBuffer: false,
        valueAsBuffer: false
    })
}