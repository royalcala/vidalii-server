import { int, string } from '../src/leafTypes'
const uuid = require('uuid/v1');
export default () => {
    describe('mutation', () => {
        let schemaql, db
        beforeAll(async () => {
            schemaql = await global.schemaql({
                schema: {
                    a: string(),
                },
                db: global.db
            })
            db = global.db
        })
        it('insert One', async () => {
            let _id = uuid()
            let response
            response = await schemaql.mutation({
                _insert: true,
                _id,
                a: 'hellow world!'
            })
            console.log('response::', response)
            expect(_id).toBe(response.data[0])

        })
        // it('_insert And _update And _del', async () => {
        //     let _id = uuid()
        //     let response
        //     response = await schemaql.mutation({
        //         _insert: true,
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