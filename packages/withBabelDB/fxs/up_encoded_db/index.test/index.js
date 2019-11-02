import up_encoded_db from '../index'
import dbDocsTest from './dbDocs'
import dbRevTest from './dbRev'
//https://github.com/marak/Faker.js/
export default ({ encoded_db }) => {
    var index = null

    describe('fxs.up_encoded_db', () => {
        test('Arguments?', () => {
            expect(encoded_db).toEqual(
                expect.objectContaining({
                    docs: expect.any(Object),
                    rev: expect.any(Object),
                    seq: expect.any(Object),
                }),
            );
        })
        index = up_encoded_db({ encoded_db })
        test('up_encoded_db is a object?', () => {
            expect(index).toEqual(
                expect.objectContaining({
                    docs: expect.any(Object),
                    rev: expect.any(Object),
                    seq: expect.any(Object),
                }),
            );
        })
        var docsTest = [
            {
                key: 1,
                value: {
                    dataString: 'hola',
                    dataNumber: 1,
                    dataObject: { hola: 1 }
                }
            },
            {
                key: 2,
                value: {
                    dataString: 'hola',
                    dataNumber: 1,
                    dataObject: { hola: 1 }
                }
            }
        ]
        dbDocsTest({ db: index.docs, docsTest })
        var revTest = [
            {
                key: { _id: 1, _rev: 1 },
                value: {
                    dataString: 'hola',
                    dataNumber: 1,
                    dataObject: { hola: 1 }
                }
            },
            {
                key: { _id: 1, _rev: 2 },
                value: {
                    dataString: 'hola',
                    dataNumber: 1,
                    dataObject: { hola: 1 }
                }
            }
        ]
        dbRevTest({ db: index.rev, docsTest: revTest })


    })
    return index

}
