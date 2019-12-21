import { singleIndexing } from '../src/fxs'
import indexingdb from '../src'
export default () => {
    describe('singleIndexing', () => {
        let db, data_db, index_db

        beforeAll(async () => {
            db = global.db
            data_db = global.data_db
            const indexes = [
                {
                    name: 'singleIndexing',
                    fx: singleIndexing([
                        'folio',
                        'spec.size',
                        'spec.color',
                        // ['index1', 'index2']
                    ])
                }
            ]
            index_db = indexingdb({ docsdb: data_db, indexes, prefix: 'indexes' })(db)
        });
        test('structure index_db', () => {
            expect(index_db.index).toEqual(
                expect.objectContaining({
                    singleIndexing: expect.any(Object)
                })
            )
        })

        test('firstTest', async () => {
            let firstDoc = {
                type: 'put',
                key: 'firstDoc',
                value: { folio: 1, spec: { size: 12.5, color: 'colorBlue' } }
            }
            let indexesPreBatch = index_db.preBatchIndexes([firstDoc])
            let dataPreBatch = data_db.preBatch([firstDoc])
            let concated = indexesPreBatch.concat(dataPreBatch)
            // console.log('concated::',concated)
            let response = await data_db.preBatchExec(
                concated
            )
            expect(response.error).toEqual(null)

            //data on data_db
            let getResponse = await data_db.get(firstDoc.key)
            expect(getResponse.error).toEqual(null)
            expect(getResponse.data).toEqual(firstDoc.value)

            // await data_db.iteratorP({
            //     onData: console.log
            // })

            // await index_db.index.singleIndexing.db.iteratorP({
            //     onData: console.log
            // })

            await index_db.query([
                {
                    useIndex: 'singleIndexing',
                    get: {
                        field: 'folio',
                        where: {
                            gte: 1,
                            lte: 10,
                        }
                    },
                    pipe: ''
                }
            ])


        })


    })

}