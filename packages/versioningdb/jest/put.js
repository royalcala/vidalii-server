import { toDecodeRev } from '../src/subdbs/revCodecs'
import { getAuto_id } from '../src/uuids'
export default () => {

    describe('put&&get', () => {
        const manualID = getAuto_id()
        let latestRev
        let value = { hello: 'world!' }
        let idb
        let config

        beforeAll(async () => {
            idb = global.idb
            config = idb.getConfig()
        });

        test('insertOneWithAutomaticID', async () => {
            let { _id, _rev } = await idb.insertOne(value)
            let response = await idb.get(_id)
            expect(response.data).toBe(value.data)
            let { _rev_num } = toDecodeRev(response._rev)
            expect(_rev_num).toBe(1)
            expect(config.seq.actualSeq()).toBe(1)
        })
        test('insertOneWithManualID', async () => {
            let { _id, _rev } = await idb.insertOne({ _id: manualID, ...value })
            let response = await idb.get(_id)
            expect(response.data).toBe(value.data)
            let { _rev_num } = toDecodeRev(response._rev)
            expect(_rev_num).toBe(1)
            latestRev = _rev
            expect(config.seq.actualSeq()).toBe(2)
        })
        test('replaceOne', async () => {
            let { _id, _rev } = await idb.replaceOne({ _id: manualID, _rev: latestRev })
            let response = await idb.get(_id)
            expect(response.data).toBe(value.data)
            let { _rev_num } = toDecodeRev(response._rev)
            expect(_rev_num).toBe(2)
            expect(config.seq.actualSeq()).toBe(3)
        })
        test('replaceOne with error on Rev', async () => {
            let response = await idb.replaceOne({ _id: manualID, _rev: latestRev })
            expect(response.error).not.toBeUndefined()
            expect(config.seq.actualSeq()).toBe(3)
        })

    })

}