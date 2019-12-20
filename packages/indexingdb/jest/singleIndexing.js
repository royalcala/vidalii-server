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
                    nameIndex: 'singleIndexing',
                    fx: singleIndexing([
                        'folio',
                        'spec.size',
                        'spec.color',
                        // ['index1', 'index2']
                    ])
                }
            ]
            index_db = indexingdb({ indexes, prefix: 'indexes' })(db)
        });
        test('structure index_db', () => {
            expect(index_db.forTestingIndex.dbs.index).toEqual(
                expect.objectContaining({
                    singleIndexing: expect.any(Object)
                })
            )
        })

        test('firstTest', async () => {
            let firstDoc = {
                type: 'put',
                key: 'firstDoc',
                value: { folio: 'folioOne', spec: { size: 'sizeOne', color: 'colorBlue' } }
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

            await data_db.iteratorP({
                onData: console.log
            })

            await index_db.iteratorP({
                onData: console.log
            })



            //data on index_db


        })


    })

}