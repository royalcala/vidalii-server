import db_encode_up from '../index'
import dbDocsTest from './dbDocs'
import dbRevTest from './dbRev'
import dbSeqTest from './dbSeq'
//https://github.com/marak/Faker.js/
export default ({ db_encode }) => {
    var index = null

    describe('fxs.db_encode_up', () => {
        test('Arguments?', () => {
            expect(db_encode).toEqual(
                expect.objectContaining({
                    docs: expect.any(Object),
                    rev: expect.any(Object),
                    seq: expect.any(Object),
                }),
            );
        })
        index = db_encode_up({ db_encode })
        test('db_encode_up is a object?', () => {
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


        var seqTest = [
            {
                key: { _seq: 1 },
                value: {
                    dataString: 'hola',
                    dataNumber: 1,
                    dataObject: { hola: 1 }
                }
            },
            {
                key: { _seq: 2 },
                value: {
                    dataString: 'hola',
                    dataNumber: 1,
                    dataObject: { hola: 1 }
                }
            }
        ]
        dbSeqTest({ db: index.seq, docsTest: seqTest })


    })
    return index

}
