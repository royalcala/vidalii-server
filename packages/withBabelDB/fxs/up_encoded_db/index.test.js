import { isNil } from 'ramda'
import up_encoded_db from './index'

const dbDocsTest = ({ db, docTest }) => {
    describe('db.Docs', () => {
        test(`.put|get`, async () => {
            const putDoc = async () => {
                var inserted
                try {
                    var response = await db.put(docTest.key, docTest.value)
                    inserted = isNil(response)
                } catch (error) {
                    console.log('putDoc Error:', error)
                    inserted = false
                }
                return inserted

            }
            const getDoc = async () => {
                var response
                try {
                    var response = await db.get(docTest.key)
                } catch (error) {
                    response = false
                }
                return response
            }

            var responsePut = await putDoc()
            expect(responsePut).toEqual(true)

            var responseGetDoc = await getDoc()
            expect(responseGetDoc).toEqual(
                expect.objectContaining({
                    dataString: expect.any(String),
                    dataNumber: expect.any(Number),
                    dataObject: expect.any(Object),
                })
            );
        })
        test(`.del`, async () => {
            const deleteDoc = async () => {
                var eliminated
                try {
                    var response = await db.del(docTest.key)
                    eliminated = isNil(response)
                } catch (error) {
                    console.log('error in docs.del', error)
                    eliminated = false
                }
                return eliminated
            }
            const existDeleted = async () => {
                var exist
                try {
                    var response = await db.get(docTest.key)
                    exist = isNil(response)
                } catch (error) {
                    exist = false
                }
                return exist
            }

            var r1 = await deleteDoc()
            expect(r1).toEqual(true)

            var r2 = await existDeleted()
            expect(r2).toEqual(false)
        })


    })
}


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
        var docTest = {
            key: 1,
            value: {
                dataString: 'hola',
                dataNumber: 1,
                dataObject: { hola: 1 }
            }
        }
        dbDocsTest({ db: index.docs, docTest })
        // putDocument({ dbs: index, dbName: 'docs' })
        // putDocument({ dbs: index, dbName: 'docs' })


    })
    return index

}
