import { removeDataBase } from '../../removeDatabase'
import encapsulatedb from '@vidalii/encapsulatedb'
import versioningdb from '@vidalii/versioningdb'
import indexingdb from '../src'
const leveldown = require('leveldown')



describe('schemadb', () => {
    let db, idb, iindexingdb
    let location = './testDB'

    beforeAll(async () => {
        removeDataBase({ location })
        db = await encapsulatedb({ store: leveldown, location: './testDB' })
        idb = await versioningdb({})(db)
        global.schemadb = schema => schemadb(schema)(idb)
        // ischemadb = schemadb({
        //     testStructure: int(),
        //     testInsertOne: int(),
        //     testInsertOneNested: {
        //         a: int()
        //     },
        //     testInsertArray: [
        //         { a: int() }
        //     ],
        //     testInsertArrayNested: [
        //         {
        //             a: int(),
        //             b: {
        //                 a2: int()
        //             }
        //         }
        //     ],
        //     testUpdateOne: string()
        // })(idb)
        // global.schemadb = ischemadb
    });
    afterAll(async () => {
        await idb.close()
    })
    testSchema()
    testInsertOneInt()
    testInsertOneArray()
    testInsertOneArrayNested()
    testInsertOneWithFx()
    testUpdateOne()
})