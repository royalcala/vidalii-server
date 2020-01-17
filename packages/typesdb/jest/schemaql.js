import init_schemaql from '../src/gql'
import { int, string, ref, uuid } from '../src/gql/fieldTypes'

export default () => {
    describe('schema', () => {
        let db
        let sampleSize
        let schema
        beforeAll(async () => {
            sampleSize = global.sampleSize
            db = global.db
            schema = init_schemaql({
                dbs: {
                    nameDB: {
                        type: 'sqlite',
                        lib: db
                    }
                }
            })
        })

        it('initialized global schemaDefs', () => {
            expect(schema).toEqual(expect.objectContaining({
                addSchema: expect.any(Function)
            }))
        })

        it('add schemas', () => {
            schema.addSchema({
                name: 'sales',
                db: 'nameDB',
                fields: {
                    _id: uuid({ primary: true, unique: true, notNullable: true }),
                    folio: string(),
                    materials: ref({
                        from: '_id',
                        to: '_id_parent',
                        toSchema: 'sales_materials'
                    })
                }
            })
            schema.addSchema({
                name: 'sales_materials',
                db: 'nameDB',
                fields: {
                    _id: uuid(({ primary: true, unique: true, notNullable: true })),
                    _id_parent: uuid({ index: true, notNullable: true }),
                    cant: int()
                }
            })

            expect(schema.getSchemas()).toEqual(expect.objectContaining({
                sales: expect.any(Object),
                sales_materials: expect.any(Object)
            }))

        })
        it('init Database', async () => {
            let result = await schema.initDatabase()
            console.log('result::', result)
        })



    })
}