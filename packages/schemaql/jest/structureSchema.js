import { int, string } from '../src/leafTypes'
import { init } from 'ramda';
export default () => {
    describe('structureSchema', () => {
        let schemaql, db
        beforeAll(async () => {

            schemaql = await global.schemaql({
                modelName: 'table1',
                schema: {
                    a: int(),
                    b: {
                        c: init()
                    }
                },
                db: global.db
            })
            db = global.db


        });
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