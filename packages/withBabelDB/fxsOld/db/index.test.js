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

const insertDoc = ({ myDB, data }) => new Promise(
    (resolve, reject) => {
        myDB.put(data.key, data.value, (err) => {
            if (err) reject({ error: true })

            myDB.get(data.key, { asBuffer: false }, (err, value) => {
                if (err) reject({ error: true })
                resolve({ error: null })
            })
        })
    }
)

const delDoc = ({ myDB, data }) => new Promise(
    (resolve, reject) => {
        myDB.del(data.key, (err) => {
            if (err) reject({ error: true })

            resolve({ error: null })
        })
    }
)

export default [
    [
        'test1_db',
        ({ db }) => {
            describe('fxs:db', () => {
                test('has db:{docs,rev,seq}', () => {

                    expect(Object.keys(db)).toEqual(
                        expect.arrayContaining([
                            'docs', 'rev', 'seq'
                        ])
                    )
                    expect(db).toEqual(
                        expect.objectContaining({
                            docs: expect.any(Object),
                            rev: expect.any(Object),
                            seq: expect.any(Object),
                        }),
                    );

                })

                describe('docs.put&get&del', () => {
                    var incrementId = 0
                    var dataDocs = fakeData({
                        key: 1,
                        value: 11
                    }, 2, (obj) => {
                        incrementId += 1
                        obj.key = incrementId
                        return obj
                    })

                    test.each(dataDocs)(
                        '%#',
                        async (data) => {
                            const myDB = db.docs
                            var inserted = await insertDoc({ myDB, data })
                            const { error } = inserted
                            expect(error).toEqual(null)

                            var deleted = await delDoc({ myDB, data })
                            expect(deleted.error).toEqual(null)
                        })
                })

                describe('rev.put&get&del', () => {
                    var incrementId = 0
                    var dataDocs = fakeData({
                        key: 1,
                        value: 11
                    }, 2, (obj) => {
                        incrementId += 1
                        obj.key = incrementId
                        return obj
                    })

                    test.each(dataDocs)(
                        '%#',
                        async (data) => {
                            const myDB = db.rev
                            var inserted = await insertDoc({ myDB, data })
                            const { error } = inserted
                            expect(error).toEqual(null)

                            var deleted = await delDoc({ myDB, data })
                            expect(deleted.error).toEqual(null)
                        })
                })

                describe('rev.seq&get&del', () => {
                    var incrementId = 0
                    var dataDocs = fakeData({
                        key: 1,
                        value: 11
                    }, 2, (obj) => {
                        incrementId += 1
                        obj.key = incrementId
                        return obj
                    })

                    test.each(dataDocs)(
                        '%#',
                        async (data) => {
                            const myDB = db.seq
                            var inserted = await insertDoc({ myDB, data })
                            const { error } = inserted
                            expect(error).toEqual(null)

                            var deleted = await delDoc({ myDB, data })
                            expect(deleted.error).toEqual(null)

                        })
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