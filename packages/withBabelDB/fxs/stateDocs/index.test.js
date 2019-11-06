export default [
    [
        'stateDocs_test1',
        ({ stateDocs, stateSeq }) => {
            describe('stateDocs', () => {
                test('has methods: insertOne?', () => {
                    expect(
                        Object.keys(stateDocs)
                    ).toEqual(expect.arrayContaining(['insertOne']))

                })
                test('.insertOne(withNoId)', async () => {
                    var response = await stateDocs.insertOne({ string: 'string1' })
                    const { seqCounter } = await stateSeq
                    expect(
                        response.error
                    ).toEqual(null)

                    expect(
                        response.data._seq
                    ).toEqual(
                        seqCounter.get()
                    )

                })
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