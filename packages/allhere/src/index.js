import encapsulatedb from '@vidalii/encapsulatedb'
import encapsulatedbextend from '@vidalii/encapsulatedbextend'
import versioningdb from '@vidalii/versioningdb'
import { pipe } from 'ramda'
let leveldown = require('leveldown')
let levelup = require('levelup')


const db = pipe(
    leveldown,
    levelup,
    encapsulatedb,
    versioningdb
)(
    './testdb'
)