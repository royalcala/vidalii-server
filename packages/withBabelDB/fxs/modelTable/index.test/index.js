import modelTable from '../index'

//https://github.com/marak/Faker.js/



export default async ({ up_encoded_db, standarizedResponse }) => {

    var index
    describe('fxs.modelTable', () => {

        beforeAll(async () => {
            index = await modelTable({ up_encoded_db, standarizedResponse })
        });
        test('Arguments?', () => {
            expect(up_encoded_db).toEqual(
                expect.objectContaining({
                    docs: expect.any(Object),
                    rev: expect.any(Object),
                    seq: expect.any(Object),
                }),
            );
        })

        test('modelTable has Functions:get, insertOne?', () => {
            // 
            expect(index).toEqual(
                expect.objectContaining({
                    getDoc: expect.any(Function),
                    insertOne: expect.any(Function)
                }),
            );
        })
        var seq = 0
        describe('.insertOne', () => {
            describe('withNoId', () => {
                var docsNoId = [
                    {
                        // _id: 1,
                        string: 'hola im string1',
                        number: 11,
                        array: ['1', 2],
                        object: { a: 1 }
                    },
                    {
                        // _id: 1,
                        string: 'hola im string2',
                        number: 11,
                        array: ['1', 2],
                        object: { a: 1 }
                    }

                ]
                test.each(docsNoId)(
                    '%#',
                    async (obj) => {
                        // console.log(obj)
                        var inserted = await index.insertOne(obj)
                        console.log('inserted:', inserted)
                        expect(inserted.error).toEqual(null)
                        seq += 1
                        expect(inserted.data._seq).toEqual(seq)
                    })

            })
            describe('withId', () => {
                var docsWithID = [
                    {
                        _id: 1,
                        string: 'hola im string1',
                        number: 11,
                        array: ['1', 2],
                        object: { a: 1 }
                    },
                    {
                        _id: 2,
                        string: 'hola im string2',
                        number: 11,
                        array: ['1', 2],
                        object: { a: 1 }
                    }

                ]
                test.each(docsWithID)(
                    '%#',
                    async (obj) => {
                        // console.log(obj)
                        var inserted = await index.insertOne(obj)
                        console.log('inserted:', inserted)
                        expect(inserted.error).toEqual(null)
                        seq += 1
                        expect(inserted.data._seq).toEqual(seq)
                    })
            })

            describe('docsWithErrorDuplicatedID', () => {
                var docswithErrorDuplicatedID = [
                    {
                        _id: 1,
                        string: 'hola im string1',
                        number: 11,
                        array: ['1', 2],
                        object: { a: 1 }
                    },
                    {
                        _id: 2,
                        string: 'hola im string2',
                        number: 11,
                        array: ['1', 2],
                        object: { a: 1 }
                    }

                ]
                test.each(docswithErrorDuplicatedID)(
                    '%#',
                    async (obj) => {
                        // console.log(obj)
                        var inserted = await index.insertOne(obj)
                        console.log('inserted:', inserted)
                        expect(inserted.error).not.toEqual(null)
                    })
            })

        })
    })
    return index

}
