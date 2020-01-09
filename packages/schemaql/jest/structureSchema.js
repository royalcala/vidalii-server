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
            console.log('schemaql.schema()::', schemaql.schema())
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
        it('testSQL', () => {
            let response
            // response = db.schema.createTable(
            //     'table1',
            //     table => {
            //         table.increments()
            //         table.uuid('extended_id').index()
            //     }
            // ).toSQL()
            // response = db('table1')
            //     .where({_id:1})
            //     .del().toSQL()

            response = db('books')
                .where('published_date', '<', 2000)
                .update([
                    {
                        status: 'archived'
                    },
                    {
                        status: 'archived2'
                    }
                ]).toString()

            console.log('response::', response)
            response = db('books')
                .where('published_date', '<', 2000)
                .update(
                    {
                        status: 'archived2'
                    }
                ).toString()

            console.log('response::', response)
            response = db('books').insert({ name: 'Old Books' }).toString()
            console.log('response::', response)
            response = db('books').insert([
                { name: 'Old Books' },
                { name: 'Old Books2' }
            ]).toString()
            console.log('response::', response)
        })
    })

}