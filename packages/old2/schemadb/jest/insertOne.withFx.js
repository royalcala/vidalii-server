import { int, string } from '../src/leafTypes'
export default () => {
    describe('insertOne.withFx', () => {
        let schemadb
        beforeAll(async () => {
            schemadb = global.schemadb({
                a: int({
                    insert: ({ newValue }) => {
                        return newValue + 1
                    }
                })
            })
        });
        test('fx', async () => {
            let response
            response = await schemadb.insertOne({ _id: 'insertOneWithSchema' }, { a: 43 })
            expect(response.schemadb.value.a).toBe(44)
        })



    })

}