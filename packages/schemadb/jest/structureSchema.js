import { int, string } from '../src/leafTypes'
export default () => {
    describe('structureSchema', () => {
        let schemaql, db
        beforeAll(async () => {
            schemaql = await global.schemaql({
                modelName: 'root',
                schema: {
                    a: int({
                        index: []
                    }),
                    a2: string(
                        {
                            props: 110,
                            index: ['customNameIndex'],
                            unique: true
                        }),
                    a3: string(10)
                    // b: {
                    //     c: int(),
                    //     d: {
                    //         e: int()
                    //     }
                    // }
                },
                db: global.db
            })
            db = global.db
        })
        it('has', () => {
            // console.log('schemaql.schema()::', schemaql.schema())
            expect(schemaql.schema()).toEqual(
                expect.objectContaining({
                    a: expect.objectContaining({
                        vidaliiLeaf: true,
                        types: {
                            graphql: 'Int',
                            knex: 'integer'
                        },
                        insert: expect.any(Function),
                        update: expect.any(Function)
                    })
                })
            )
        })
        // it('testWherever', async () => {
        //     const trx = await db.transaction();
        //     await trx.schema.createTable('users', function (table) {
        //         table.increments();
        //         table.string('name');
        //     })
        //     await trx.insert({ name: 'hellow world' }).into('users')
        //     let data = await trx('users').select()
        //     console.log('data::', data)
        //     let query=  trx('users').del().where({ id: 1 }).toString()
        //     console.log('query::',query)
        //     await trx('users').del().where({ id: 1 })
        //     // trx(tableName).del({ _id }).where({ _id }).returning()
        //     data = await trx('users').select()
        //     console.log('data::',data)
        // })

    })

}