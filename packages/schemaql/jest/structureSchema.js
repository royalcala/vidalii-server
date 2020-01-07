import { int, string } from '../src/leafTypes'
export default () => {
    describe('structureSchema', () => {
        let schemaql, db
        beforeAll(async () => {
            schemaql = await global.schemaql({
                modelName: 'root',
                schema: {
                    a: int(),
                    a2: string(
                        {
                            props: 110,
                            index: true,
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
            let response = db.schema.createTable(
                'table1',
                table => {
                    table.increments()
                    table.uuid('extended_id').index()
                }
            ).toSQL()
            console.log('response::', response)
        })
    })

}