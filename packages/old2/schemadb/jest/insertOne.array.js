import { int, string } from '../src/leafTypes'

export default () => {
    describe('insertOne.array', () => {
        let schemadb
        beforeAll(async () => {
            schemadb = global.schemadb({
                array1: [
                    { a: int() }
                ],
            })
        });
        test('array one size', async () => {
            let response
            response = await schemadb.insertOne({ _id: 'insertArray' }, {
                array1: [
                    { a: 2.5 }
                ]
            })            
            expect(response.schemadb.value).toEqual(
                expect.objectContaining({
                    array1: [{ a: 2 }]
                })
            )
        })
        // test('array more than one size', async () => {
        //     let response
        //     response = await schemadb.insertOne({ _id: 'insertArray' }, {
        //         array1: [
        //             { a: 2.5 },
        //             { a: 3.5 },
        //             { a: '43px' },
        //             { a: 'string to 0' }
        //         ]
        //     })
        //     expect(response.schemadb.value).toEqual(
        //         expect.objectContaining({
        //             array1: [
        //                 { a: 2 },
        //                 { a: 3 },
        //                 { a: 43 },
        //                 { a: 0 }
        //             ]
        //         })
        //     )
        // })

    })

}