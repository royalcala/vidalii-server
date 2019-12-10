console.clear()
import { pipe } from 'ramda'
import encapsulatedb from '@vidalii/encapsulatedb'
import sublevel from '../src'
const leveldown = require('leveldown')
const levelup = require('levelup')
test()
async function test() {
    // const instanceDB = pipe(
    //     leveldown,
    //     levelup,
    //     abstract,
    //     sublevel({ prefix: 'rev' })
    // )('./testDB')
    const db = await encapsulatedb({ store: leveldown, location: './testDB' })
    const subRev = pipe(
        sublevel({ prefix: 'rev' })
    )(db)

    const subSeq = pipe(
        sublevel({ prefix: 'seq' })
    )(db)

    tests(subRev)
    tests2(subSeq)
    async function tests(instanceDB) {
        let putResponse = await instanceDB.put('abc', '0123')
        console.log('putResponse::', putResponse)

        let getResponse = await instanceDB.get('abc', { asBuffer: false })
        console.log('getResponse::', getResponse)

        let iteratorResponse = await instanceDB.iteratorP({
            onData: console.log,
            keyAsBuffer: false,
            valueAsBuffer: false
        })
    }
    async function tests2(instanceDB) {
        let putResponse = await instanceDB.put('abc2', '0123')
        console.log('putResponse::', putResponse)

        let getResponse = await instanceDB.get('abc2', { asBuffer: false })
        console.log('getResponse::', getResponse)

        let iteratorResponse = await instanceDB.iteratorP({
            onData: console.log,
            keyAsBuffer: false,
            valueAsBuffer: false
        })
    }
}