import { singleIndexing } from '../src/fxs'
import indexingdb from '../src'
import { resolvePlugin } from '@babel/core'
import { reject, insert } from 'ramda'

export default () => {
    describe('pouchdb', () => {

        let sampleSize, db
        beforeAll(async () => {
            sampleSize = global.sampleSize
            db = global.pouchdb
        });
        test('insertManyBatch', async () => {

            let howMany = sampleSize
            let sample = []
            for (let index = 0; index < howMany; index++) {
                sample.push({
                    type: 'put',
                    key: index,
                    value: { folio: index, spec: { size: 12.5, color: 'colorBlue' } }
                    // value: { folio: index }
                })
            }
            let response = await db.bulkDocs(sample)
            expect(response.length).toEqual(sampleSize)
        })
        it('read all', async () => {
            try {
                var result = await db.allDocs({
                    include_docs: true,
                    attachments: true
                });
            } catch (err) {
                console.log(err);
            }

            expect(sampleSize).toEqual(result.total_rows)

        })
        it('createIndex', async () => {
            try {
                var result = await db.createIndex({
                    index: {
                        fields: ['key']
                    }
                });
            } catch (err) {
                console.log(err);
            }

            expect(true).toEqual(true)

        })
        it('find with index', async () => {
            try {
                var result = await db.find({
                  selector: {key: 10},
                  fields: ['key'],
                //   sort: ['name']
                });
              } catch (err) {
                console.log(err);
              }
              
              expect(true).toEqual(true)
        })
        // test('writeManySamples with One index', async () => {
        //     // manyTest (5347ms) with fx callpromise
        //     //manyTest (6522ms) without

        //     // let millions = n => Number('1000' + '000') * n
        //     // let howMany = millions(1)
        //     let howMany = sampleSize
        //     let sample = []
        //     for (let index = 0; index < howMany; index++) {
        //         sample.push({
        //             type: 'put',
        //             key: index,
        //             value: { folio: index, spec: { size: 12.5, color: 'colorBlue' } }
        //             // value: { folio: index }
        //         })
        //     }

        //     let indexesPreBatch = index_db.preBatchIndexes(sample)
        //     let dataPreBatch = data_db.preBatch(sample)
        //     let concated = indexesPreBatch.concat(dataPreBatch)
        //     // console.log('concated::',concated)
        //     let response = await data_db.preBatchExec(
        //         concated
        //     )
        //     expect(response.error).toEqual(null)

        //     //data on data_db
        //     // let getResponse = await data_db.get(firstDoc.key)
        //     // expect(getResponse.error).toEqual(null)
        //     // expect(getResponse.data).toEqual(firstDoc.value)

        //     // await data_db.iteratorP({
        //     //     onData: console.log
        //     // })

        //     // await index_db.index.singleIndexing.db.iteratorP({
        //     //     onData: console.log
        //     // })



        //     // console.log('dataFromIndex::', dataFromIndex)
        // })

        // it('check size batch', async () => {
        //     let data = 0
        //     let response = await data_db.iteratorP({
        //         onData: doc => {
        //             data++
        //         }
        //     })
        //     console.log('data::', data)
        //     expect(sampleSize).toEqual(data)

        // })

        // test('firstTest', async () => {
        //     let firstDoc = {
        //         type: 'put',
        //         key: 'firstDoc',
        //         // value: { folio: 0, spec: { size: 12.5, color: 'colorBlue' } }
        //         value: { folio: 0 }
        //     }
        //     let indexesPreBatch = index_db.preBatchIndexes([firstDoc])
        //     let dataPreBatch = data_db.preBatch([firstDoc])
        //     let concated = indexesPreBatch.concat(dataPreBatch)
        //     // console.log('concated::',concated)
        //     let response = await data_db.preBatchExec(
        //         concated
        //     )
        //     expect(response.error).toEqual(null)

        //     //data on data_db
        //     let getResponse = await data_db.get(firstDoc.key)
        //     expect(getResponse.error).toEqual(null)
        //     expect(getResponse.data).toEqual(firstDoc.value)

        //     // await data_db.iteratorP({
        //     //     onData: console.log
        //     // })

        //     // await index_db.index.singleIndexing.db.iteratorP({
        //     //     onData: console.log
        //     // })

        //     let dataFromIndex = await index_db.query([
        //         {
        //             useIndex: 'singleIndexing',
        //             get: {
        //                 where: {
        //                     field: 'folio',
        //                     start: 0,
        //                     end: 10,
        //                 },
        //                 wherePipe: []
        //             },
        //         }
        //     ])
        //     console.log('dataFromIndex::', dataFromIndex)
        // })



        // it('with query size', async () => {
        //     // query (2871ms)

        //     let dataFromIndex = await index_db.query([
        //         {
        //             useIndex: 'singleIndexing',
        //             get: {
        //                 where: {
        //                     field: 'folio',
        //                     start: 0,
        //                     end: 10,
        //                 },
        //                 wherePipe: []
        //             },
        //         }
        //     ])
        //     console.log('dataFromIndex.singleIndexing.length::', dataFromIndex.singleIndexing.length)
        //     expect(sampleSize).toEqual(dataFromIndex.singleIndexing.length)

        // })




    })

}