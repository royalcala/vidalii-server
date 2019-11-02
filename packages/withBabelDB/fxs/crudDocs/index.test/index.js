import crud from '../index'
// import dbDocsTest from './dbDocs'
// import dbRevTest from './dbRev'
//https://github.com/marak/Faker.js/
export default ({ up_encoded_db }) => {
    var index = null

    describe('fxs.crud', () => {
        test('Arguments?', () => {
            expect(up_encoded_db).toEqual(
                expect.objectContaining({
                    docs: expect.any(Object),
                    rev: expect.any(Object),
                    seq: expect.any(Object),
                }),
            );
        })
        index = crud({ up_encoded_db })
        test('crud has get, insertOne Functions?', () => {
            expect(index).toEqual(
                expect.objectContaining({
                    get: expect.any(Function),
                    insertOne: expect.any(Function)
                }),
            );
        })
        // var docsTest = [
        //     {
        //         key: 1,
        //         value: {
        //             dataString: 'hola',
        //             dataNumber: 1,
        //             dataObject: { hola: 1 }
        //         }
        //     },
        //     {
        //         key: 2,
        //         value: {
        //             dataString: 'hola',
        //             dataNumber: 1,
        //             dataObject: { hola: 1 }
        //         }
        //     }
        // ]
        // dbDocsTest({ db: index.docs, docsTest })
        // var revTest = [
        //     {
        //         key: { _id: 1, _rev: 1 },
        //         value: {
        //             dataString: 'hola',
        //             dataNumber: 1,
        //             dataObject: { hola: 1 }
        //         }
        //     },
        //     {
        //         key: { _id: 1, _rev: 2 },
        //         value: {
        //             dataString: 'hola',
        //             dataNumber: 1,
        //             dataObject: { hola: 1 }
        //         }
        //     }
        // ]
        // dbRevTest({ db: index.rev, docsTest: revTest })


    })
    return index

}
