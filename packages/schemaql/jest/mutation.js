import { int, string } from '../src/leafTypes'
const uuid = require('uuid/v1');
export default () => {
    describe('mutation', () => {
        let schemaql, db
        beforeAll(async () => {
            db = global.db
            // console.log('db.del({_id}).into(tableName).where({ _id }).toString()::',
            // db.del({_id:11}).into('tableName').where({ _id:11 }).toString())
            schemaql = await global.schemaql({
                schema: {
                    a: string(),
                },
                db
            })

        })
        it('insertOne, automatic id and default action:insert', async () => {
            let response
            response = await schemaql.mutation(
                {
                    a: 'automatic id and action:insert'
                }
            )
            expect(response.error).toBe(null)
            expect(response.transactionCompleted).toBe(true)
        })
        it('insertOne, manual ID', async () => {
            let response
            response = await schemaql.mutation(
                {
                    _action: 'insert',
                    _id: 0,
                    a: 'hellow world!'
                }
            )
            expect(response.error).toBe(null)
            expect(response.transactionCompleted).toBe(true)
        })
        test('insertMany, manual ID', async () => {
            let response
            response = await schemaql.mutation([
                {
                    _action: 'insert',
                    _id: 1,
                    a: 'hellow world in array1!'
                },
                {
                    _action: 'insert',
                    _id: 2,
                    a: 'hellow world in array2!'
                }
            ])
            expect(response.error).toBe(null)
            expect(response.transactionCompleted).toBe(true)
        })
        test('updateOne', async () => {
            let response
            response = await schemaql.mutation(
                {
                    _action: 'update',
                    _id: 0,
                    a: 'update world in array2!'
                }
            )
            expect(response.error).toBe(null)
            expect(response.transactionCompleted).toBe(true)
        })
        test('updateMany', async () => {
            let response
            response = await schemaql.mutation([
                {
                    _action: 'update',
                    _id: 1,
                    a: 'Updated.hellow world in array1!'
                },
                {
                    _action: 'update',
                    _id: 2,
                    a: 'Updated.hellow world in array2!'
                }
            ])
            expect(response.error).toBe(null)
            expect(response.transactionCompleted).toBe(true)
        })
        test('delOne', async () => {
            let response
            response = await schemaql.mutation(
                {
                    _action: 'del',
                    _id: 1,
                }
            )
            expect(response.error).toBe(null)
            expect(response.transactionCompleted).toBe(true)
        })
        test('delMany', async () => {
            let response
            response = await schemaql.mutation([
                {
                    _action: 'del',
                    _id: 0,
                },
                {
                    _action: 'del',
                    _id: 2,
                }
            ])
            expect(response.error).toBe(null)
            expect(response.transactionCompleted).toBe(true)
        })
        // it('_insert And _update And _del', async () => {
        //     let _id = uuid()
        //     let response
        //     response = await schemaql.mutation({
        //         _action:'insert',
        //         _id,
        //         a: 'hellow world!'
        //     })
        //     // console.log('response::', response)
        //     expect(_id).toBe(response.data[0])
        //     response = await schemaql.mutation({
        //         _update: true,
        //         _id,
        //         a: 'hellow world updated!'
        //     })
        //     // console.log('response::', response)
        //     expect(response.error).toBe(null)
        //     response = await schemaql.mutation({
        //         _del: true,
        //         _id,
        //     })

        //     // console.log('response::',response)
        //     expect(response.error).toBe(null)

        // })
    })

}