export default [
    [
        'crud_queue_test1',
        ({ crud_queue }) => {
            describe('crud_queue', () => {
                test('addQueue', () => {
                    crud_queue.addQueue({ _id: 1, _rev: 1 })
                    expect(
                        crud_queue.checkExistQueue({ _id: 1, _rev: 1 })
                    ).toEqual(true);
                })
            })
        }
    ],
    [
        'crud_queue_test2',
        ({ crud_queue }) => {
            describe('crud_queue', () => {
                test('checkExistQueue the perservere store in other Fx?', () => {
                    expect(
                        crud_queue.checkExistQueue({ _id: 1, _rev: 1 })
                    ).toEqual(true);
                })

                test('elimateQueue', () => {
                    crud_queue.elimateQueue({ _id: 1, _rev: 1 })
                    expect(
                        crud_queue.checkExistQueue({ _id: 1, _rev: 1 })
                    ).toEqual(false);
                })
            })
        }
    ]
]