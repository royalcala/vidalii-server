export default [
    [
        'stateSeq_test1',
        ({ stateSeq }) => {
            describe('stateSeq', () => {
                test('insertOne', async () => {
                    var istateSeq = await stateSeq
                    var response = await istateSeq.insertOne()

                    expect(
                        response.error
                    ).toEqual(false);

                    expect(
                        istateSeq.seqCounter.get()
                    ).toEqual(response._seq);
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