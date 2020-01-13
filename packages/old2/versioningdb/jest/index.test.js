import encapsulatedb from '@vidalii/encapsulatedb'
import versioningdb from '../src'
// import { removeDataBase } from './removeDB'
import config from './configs'
import put from './put'
const leveldown = require('leveldown')
import {removeDataBase} from '../../removeDatabase'
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

})