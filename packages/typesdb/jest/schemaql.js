import init_schemaql from '../src/gql'
import { int, string, ref, uuid, type } from '../src/gql'

export default () => {
    describe('schema', () => {
        // let db
        // let sampleSize
        let schema
        beforeAll(async () => {
            schema = init_schemaql()
            schema.db.addClient({
                name: 'nameDB',
                client: 'sqlite3',
                connection: {
                    filename: global.path
                },
            })
        })
        it('initialized global schemaDefs', () => {
            // expect(schema).toEqual(expect.objectContaining({
            //     addSchema: expect.any(Function)
            // }))
        })

        it('add schemas', () => {
            schema.schema.add({
                name: 'sales',
                db: 'nameDB',
                fields: {
                    _id: uuid({ primary: true, unique: true, notNullable: true }),
                    folio: string(),
                    //use schema.extend
                    // materials: uuid({
                    //     ref: {
                    //         from: '_id',
                    //         to: '_id_parent',
                    //         toSchema: 'sales_materials'
                    //     }
                    // })
                }
            })

            schema.schema.add({
                name: 'salesmaterials',
                db: 'nameDB',
                fields: {
                    _id: uuid(({ primary: true, unique: true, notNullable: true })),
                    _id_material: ref({
                        schemaName: 'catalogue_materials',
                        fieldName: '_id'
                    }),
                    cant: int()
                },
                extend: {
                    schema: 'sales',
                    key: '_id',
                    field: 'materials',
                    relation: 'one_to_one',
                    resolver: 'custom|subtableDefault',
                },
            })

            schema.schema.add({
                name: 'catalogue_materials',
                db: 'nameDB',
                fields: {
                    _id: uuid(({ primary: true, unique: true, notNullable: true })),
                    name: string()
                }
            })
            // console.log('schema.schema.get()::', schema.schema.get())
            // expect(schema.schema.get()).toEqual(expect.objectContaining({
            //     sales: expect.any(Object),
            //     sales_materials: expect.any(Object)
            // }))

        })
        // it('init Database', async () => {
        //     let result = await schema.db.init()
        // })
        it('startServer', async () => {
            let result = await schema.startServer()
            console.log('result::', result)
        })
        it('mutate schema', async () => {

        })



    })
}