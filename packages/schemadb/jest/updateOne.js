import { int, string } from '../src/leafTypes'

export default () => {
    describe('updateOne', () => {
        let schemadb
        beforeAll(async () => {
            schemadb = global.schemadb({
                a: int({
                    update: ({ newValue, prevValue, prevDoc }) => {
                        newValue.data.prevValue = prevValue
                        newValue.data.prevDoc = prevDoc
                        return newValue.newValue
                    }
                })
            })
        });
        test('test prevValue,prevDoc,newValue', async () => {
            let response
            response = await schemadb.insertOne({ _id: 'update' }, { a: '43' })            
            expect(response.schemadb.value.a).toBe(43)
            let data = {}
            response = await schemadb.updateOne(
                response.versioningdb.key,
                {
                    a: {
                        data,
                        newValue: 44
                    }
                })
            console.log('response::', response)
            expect(response.schemadb.value.a).toBe(44)
            expect(data.prevValue).toBe(43)
            expect(data.prevDoc).toEqual(
                expect.objectContaining({
                    a: 43
                })
            )
        })


    })

}