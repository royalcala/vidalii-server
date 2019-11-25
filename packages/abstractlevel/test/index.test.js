console.log('in abstractionlevel testing')
import abstractlevel from '../src'
const leveldown = require('leveldown')
const levelup = require('levelup')
// const abstractlevel = require('../src')


let dbdown = leveldown('./dbtest')
let dbup = levelup(dbdown)
let dbabs = abstractlevel(dbup)

test()
async function test() {
    let putResponse = await dbabs.put('key one', 'value one')
    console.log('putResponse::', putResponse)

    let getResponse = await dbabs.get('key one', { asBuffer: false })
    console.log('getResponse::', getResponse)
}
