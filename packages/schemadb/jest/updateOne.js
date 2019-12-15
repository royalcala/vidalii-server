import { int, string } from '../src/leafTypes'
export default () => {
    describe('updateOne', () => {
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
            response = await schemadb.insertOne({ _id: 'update' }, { a: '43px' })
            // console.log('response::', response)
            expect(response.schemadb.value.a).toBe(43)
            response = await schemadb.updateOne(
                response.versioningdb.key,
                { a: '44px' })            
            expect(response.schemadb.value.a).toBe(44)
        })
        // test('string=0', async () => {
        //     let response
        //     response = await schemadb.insertOne({ _id: 1 }, { a: 'holispx' })
        //     expect(response.schemadb.value.a).toBe(0)
        // })
        // test('negative', async () => {
        //     let response
        //     response = await schemadb.insertOne({ _id: 1 }, { a: -1 })
        //     expect(response.schemadb.value.a).toBe(-1)
        // })
        // test('float', async () => {
        //     let response
        //     response = await schemadb.insertOne({ _id: 1 }, { a: 2.99 })
        //     expect(response.schemadb.value.a).toBe(2)
        // })
        // test('doesnt has properties undefined', async () => {
        //     let response
        //     response = await schemadb.insertOne({ _id: 1 }, { a: 2.99, notToSave: 10 })
        //     expect(response.schemadb.value).toEqual(
        //         expect.objectContaining({
        //             a: 2
        //         })
        //     )
        //     // expect(response.schemadb.value.hasOwnProperty('a')).toEqual(true)
        //     expect(response.schemadb.value.hasOwnProperty('notToSave')).toEqual(false)
        // })
        // test('nested', async () => {
        //     let response
        //     response = await schemadb.insertOne({ _id: 1 }, {
        //         a: 2.99,
        //         notToSave: 10,
        //         b: {
        //             a2: 2.3
        //         }
        //     })
        //     expect(response.schemadb.value).toEqual(
        //         expect.objectContaining({
        //             a: 2,
        //             b: {
        //                 a2: 2
        //             }
        //         })
        //     )
        //     expect(response.schemadb.value.hasOwnProperty('notToSave')).toEqual(false)
        // })


    })

}