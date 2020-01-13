export default [
    [
        'stateRev_test1',
        ({ stateRev }) => {
            describe('stateRev', () => {
                test('insertOne', async () => {
                    var response = await stateRev.insertOne({ _id: 'stateRevTest1', dataDoc: { holis: 'data' } })
                    expect(
                        response.error
                    ).toEqual(false);
                    expect(
                        response._rev
                    ).toEqual(1);
                })
                //update
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