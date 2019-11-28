console.log('in encapsulatedb testing')
import encapsultedb from '../src'
import { pipe, then } from 'ramda'
const leveldown = require('leveldown')
// const levelup = require('levelup')
// const encapsultedb = require('../src')


// let dbdown = leveldown('./dbtest')
// let dbup = levelup(dbdown)
// let dbabs = encapsultedb(dbdown)
async function test(db) {
    let putResponse = await db.put('key one', 'value one')
    console.log('putResponse::', putResponse)

    let getResponse = await db.get('key one', { asBuffer: false })
    console.log('getResponse::', getResponse)


    // let streamResponse = await db.createReadStreamP({
    //     onData: console.log,
    // })

    let iteratorResponse = await db.iteratorP({
        onData: console.log,
        keyAsBuffer: false,
        valueAsBuffer: false
    })
}

let dbabs = pipe(
    encapsultedb,
    then(test)
)({
    store: leveldown,
    location: './dbtest'
})


