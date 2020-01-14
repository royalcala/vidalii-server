//https://github.com/marak/Faker.js/

const fakeData = (obj, times, fxToChange) => {
    var finalData = []
    for (var i = 0; i < times; i++) {
        //by reference object
        // finalData.push(fxToChange(obj))
        //copy of object
        finalData.push(fxToChange({ ...obj }))
    }
    return finalData
}

export default ({ crud_insertOne, stateSeq }) => {
    var oSeq
    describe('fxs.crud_insertOne', () => {

        beforeAll(async () => {
            const { seqCounter } = await stateSeq
            oSeq = seqCounter
        });
        // test('Arguments?', () => {
        //     expect(db_encode_up).toEqual(
        //         expect.objectContaining({
        //             docs: expect.any(Object),
        //             rev: expect.any(Object),
        //             seq: expect.any(Object),
        //         }),
        //     );
        // })

        // test('crud_insertOne has Functions:get, insertOne?', () => {
        //     // 
        //     expect(index).toEqual(
        //         expect.objectContaining({
        //             getDoc: expect.any(Function),
        //             insertOne: expect.any(Function)
        //         }),
        //     );
        // })
        var seq = 0
        describe('.insertOne', () => {
            describe('withNoId', () => {
                var docsNoId = fakeData({
                    string: 'hola im string1',
                    number: 11,
                    array: ['1', 2],
                    object: { a: 1 }
                }, 2, (obj) => obj)

                test.each(docsNoId)(
                    '%#',
                    async (obj) => {
                        // console.log(obj)
                        var inserted = await crud_insertOne(obj)
                        // console.log('inserted:', inserted.data._seq)
                        expect(inserted.error).toEqual(null)
                        seq += 1
                        expect(inserted.data._seq).toEqual(oSeq.get())
                        expect(seq).toEqual(oSeq.get())
                    })

            })
            describe('withId', () => {
                var store = {
                    counter: 1
                }
                var docsWithID = fakeData({
                    _id: null,
                    string: 'hola im string1',
                    number: 11,
                    array: ['1', 2],
                    object: { a: 1 }
                }, 2, (obj) => {
                    obj._id = store.counter
                    store.counter += 1
                    return obj
                })
                // console.log(docsWithID)
                test.each(docsWithID)(
                    '%#',
                    async (obj) => {
                        // console.log(obj)
                        var inserted = await crud_insertOne(obj)
                        // console.log('inserted:', inserted.data._seq)
                        expect(inserted.error).toEqual(null)
                        seq += 1
                        expect(inserted.data._seq).toEqual(oSeq.get())
                        expect(seq).toEqual(oSeq.get())
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
                        var inserted = await crud_insertOne(obj)
                        // console.log('inserted:', inserted)
                        expect(inserted.error).not.toEqual(null)
                    })
            })

        })
    })

}