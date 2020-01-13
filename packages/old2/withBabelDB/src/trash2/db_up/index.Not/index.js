import dbDocsTest from './dbDocs'
import dbRevTest from './dbRev'
import dbSeqTest from './dbSeq'
//https://github.com/marak/Faker.js/
export default ({ db_encode_up }) => {
    describe('fxs.db_encode_up', () => {
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
        dbDocsTest({ db: db_encode_up.docs, docsTest })

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
        dbRevTest({ db: db_encode_up.rev, docsTest: revTest })


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
        dbSeqTest({ db: db_encode_up.seq, docsTest: seqTest })


    })
 
}
