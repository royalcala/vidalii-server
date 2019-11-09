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

export default [
    [
        'crud_insertOne_test1',
        ({ crud_insertOne, stateSeq, db_encode_up }) => {
            describe('crud_insertOne', () => {
                var seqCounter
                beforeAll(async () => {
                    const init1 = await stateSeq
                    seqCounter = init1.seqCounter
                });
                // test('has methods: insertOne?', () => {
                //     expect(
                //         Object.keys(crud_insertOne)
                //     ).toEqual(expect.arrayContaining(['insertOne']))

                // })
                describe('withNoId', () => {
                    var docsNoId = fakeData({
                        string: 'hola im string1',
                        number: 11,
                        array: ['1', 2],
                        object: { a: 1 }
                    }, 2, (obj) => obj)


                    test.each(docsNoId)(
                        'inserted:%#',
                        async (obj) => {
                            var inserted = await crud_insertOne(obj)
                            const { data, error } = inserted
                            expect(error).toEqual(null)
                            expect(data._seq).toEqual(
                                seqCounter.get()
                            )
                            expect(data._rev).toEqual(1)

                            
                            var inRev = await db_encode_up.rev.get({
                                _id:191919,
                                _rev: data._rev
                            })
                            console.log(inRev)
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
                        'inserted:%#',
                        async (obj) => {
                            // console.log(obj)
                            var inserted = await crud_insertOne(obj)
                            // console.log('inserted:', inserted.data._seq)
                            expect(inserted.error).toEqual(null)
                            expect(inserted.data._seq).toEqual(
                                seqCounter.get()
                            )
                            expect(inserted.data._rev).toEqual(1)
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
                        'NoInserted:%#',
                        async (obj) => {
                            // console.log(obj)
                            var inserted = await crud_insertOne(obj)
                            // console.log('inserted:', inserted)
                            expect(inserted.error).not.toEqual(null)
                        })
                })
                // test('.insertOne(withNoId)', async () => {
                //     var response = await crud_insertOne.insertOne({ string: 'string1' })

                //     expect(
                //         response.error
                //     ).toEqual(null)

                // expect(response.data._seq).toEqual(
                //     seqCounter.get()
                // )
                // expect(response.data._rev).toEqual(1)

                // })
                // test('.insertOne(withId)', async () => {
                //     var response = await crud_insertOne.insertOne({ _id: 1, string: 'string1' })
                //     expect(
                //         response.error
                //     ).toEqual(null)

                //     expect(
                //         response.data._seq
                //     ).toEqual(
                //         seqCounter.get()
                //     )
                //     expect(
                //         response.data._rev
                //     ).toEqual(
                //         1
                //     )

                // })
            })


        }
    ],
    // [
    //     'crud_queue_test2',
    //     ({ crud_queue }) => {
    //         describe('crud_queue', () => {
    //             test('checkExistQueue the perservere store in other Fx?', () => {
    //                 expect(
    //                     crud_queue.checkExistQueue({ _id: 1, _rev: 1 })
    //                 ).toEqual(true);
    //             })

    //             test('elimateQueue', () => {
    //                 crud_queue.elimateQueue({ _id: 1, _rev: 1 })
    //                 expect(
    //                     crud_queue.checkExistQueue({ _id: 1, _rev: 1 })
    //                 ).toEqual(false);
    //             })
    //         })
    //     }
    // ]
]