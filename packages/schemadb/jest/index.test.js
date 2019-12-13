import { removeDataBase } from '../../removeDatabase'
import encapsulatedb from '@vidalii/encapsulatedb'
import versioningdb from '@vidalii/versioningdb'
import schemadb from '../src'
import { int, string } from '../src/leafTypes'
import testSchema from './structureSchema'
import insertOne from './insertOne'
const leveldown = require('leveldown')



describe('schemadb', () => {
    let db, idb, ischemadb
    let location = './testDB'

    beforeAll(async () => {
        removeDataBase({ location })
        db = await encapsulatedb({ store: leveldown, location: './testDB' })
        idb = await versioningdb({})(db)
        ischemadb = schemadb({
            a: int(),
            b: int()
        })(idb)
        global.schemadb = ischemadb
    });
    afterAll(async () => {
        await idb.close()
    })
    // testSchema()
    insertOne()
})