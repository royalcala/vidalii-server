import { int, string } from '../src/leafTypes'
export default () => {
    describe('insertOne.int', () => {
        let schemadb
        beforeAll(async () => {
            schemadb = global.schemadb({
                a: int(),
                b: {
                    a2: int()
                },
            })
        });
        test('43px=3', async () => {
            let response
            response = await schemadb.insertOne({ _id: 'insert' }, { a: '43px' })
            expect(response.schemadb.value.a).toBe(43)
        })
        test('string=0', async () => {
            let response
            response = await schemadb.insertOne({ _id: 'insert' }, { a: 'holispx' })
            expect(response.schemadb.value.a).toBe(0)
        })
        test('negative', async () => {
            let response
            response = await schemadb.insertOne({ _id: 'insert' }, { a: -1 })
            expect(response.schemadb.value.a).toBe(-1)
        })
        test('float', async () => {
            let response
            response = await schemadb.insertOne({ _id: 'insert' }, { a: 2.99 })
            expect(response.schemadb.value.a).toBe(2)
        })
        test('doesnt has properties undefined', async () => {
            let response
            response = await schemadb.insertOne({ _id: 'insert' }, { a: 2.99, notToSave: 10 })
            expect(response.schemadb.value).toEqual(
                expect.objectContaining({
                    a: 2
                })
            )
            // expect(response.schemadb.value.hasOwnProperty('a')).toEqual(true)
            expect(response.schemadb.value.hasOwnProperty('notToSave')).toEqual(false)
        })
        test('nested', async () => {
            let response
            response = await schemadb.insertOne({ _id: 'insert' }, {
                a: 2.99,
                notToSave: 10,
                b: {
                    a2: 2.3
                }
            })
            expect(response.schemadb.value).toEqual(
                expect.objectContaining({
                    a: 2,
                    b: {
                        a2: 2
                    }
                })
            )
            expect(response.schemadb.value.hasOwnProperty('notToSave')).toEqual(false)
        })


    })

}