import encapsulatedb from '@vidalii/encapsulatedb'
import versioningdb from '../src'
import { removeDataBase } from './removeDB'
import config from './configs'
import put from './put'
const leveldown = require('leveldown')

describe('versioningdb', () => {
    let db, idb
    let location = './testDB'
    beforeAll(async () => {
        removeDataBase({ location })
        db = await encapsulatedb({ store: leveldown, location: './testDB' })
        idb = await versioningdb({})(db)
        global.idb = idb
    });
    afterAll(async () => {
        await idb.close()
    })
    config()
    put()
    // test('insertOneWithAutomaticID', async () => {
    //     let { _id, _rev } = await idb.put(value)
    //     let response = await idb.get(_id)
    //     expect(response.data).toBe(value.data)
    //     let { _rev_num } = toDecodeRev(response._rev)
    //     expect(_rev_num).toBe(1)
    // })

    // test('insertOneWithManualID', async () => {
    //     let { _id, _rev } = await idb.put({ _id: manualID, ...value })      
    //     let response = await idb.get(_id)
    //     expect(response.data).toBe(value.data)
    //     let { _rev_num } = toDecodeRev(response._rev)
    //     expect(_rev_num).toBe(1)
    //     latestRev = _rev
    // })
    // test('replaceOne', async () => {
    //     let { _id, _rev } = await idb.put({ _id: manualID, _rev: latestRev })
    //     let response = await idb.get(_id)
    //     expect(response.data).toBe(value.data)
    //     let { _rev_num } = toDecodeRev(response._rev)
    //     expect(_rev_num).toBe(2)

    // })





})