const uuid = require('uuid/v4')
import { toDecodeRev } from '../src/subdbs/revCodecs'
export default () => {

    describe('put&&get', () => {
        const manualID = uuid()
        let latestRev
        let value = { hello: 'world!' }
        let idb
        beforeAll(async () => {
            idb = global.idb
        });

        test('insertOneWithAutomaticID', async () => {
            let { _id, _rev } = await idb.put(value)
            let response = await idb.get(_id)
            expect(response.data).toBe(value.data)
            let { _rev_num } = toDecodeRev(response._rev)
            expect(_rev_num).toBe(1)
        })
        test('insertOneWithManualID', async () => {
            let { _id, _rev } = await idb.put({ _id: manualID, ...value })
            let response = await idb.get(_id)
            expect(response.data).toBe(value.data)
            let { _rev_num } = toDecodeRev(response._rev)
            expect(_rev_num).toBe(1)
            latestRev = _rev
        })
        test('replaceOne', async () => {
            let { _id, _rev } = await idb.put({ _id: manualID, _rev: latestRev })
            let response = await idb.get(_id)
            expect(response.data).toBe(value.data)
            let { _rev_num } = toDecodeRev(response._rev)
            expect(_rev_num).toBe(2)
        })
        test('replaceOne with error on Rev', async () => {
            let response = await idb.put({ _id: manualID, _rev: latestRev })
            expect(response.error).not.toBeUndefined()
        })
    })

}