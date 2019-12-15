import { int, string } from '../src/leafTypes'

export default () => {
    describe('insertOne.arrayNested', () => {
        let schemadb
        beforeAll(async () => {
            schemadb = global.schemadb({
                array1: [
                    {
                        a: int(),
                        b: {
                            a2: int()
                        },
                        arrayDoble: [
                            { a21: int() }
                        ]
                    }
                ],
            })
        });

        test('array nested', async () => {
            let response
            response = await schemadb.insertOne({ _id: 'insertArrayNested' }, {
                array1: [
                    {
                        a: 2.5,
                        b: {
                            a2: 1.5
                        }
                    },
                ]
            })
            expect(response.schemadb.value).toEqual(
                expect.objectContaining({
                    array1: [
                        {
                            a: 2,
                            b: { a2: 1 }
                        },
                    ]
                })
            )
        })

        test('arrayDoble', async () => {
            let response
            response = await schemadb.insertOne({ _id: 'insertArrayNested' }, {
                array1: [
                    { arrayDoble: [{ a21: 10 }] }
                ]
            })
            expect(response.schemadb.value).toEqual(
                expect.objectContaining({
                    array1: [
                        { arrayDoble: [{ a21: 10 }] }
                    ]
                })
            )
        })


    })

}