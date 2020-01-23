import { schemas } from '../src/gql'
import { int, string, ref, uuid, relation } from '../src/gql'

export default () => {
    describe('schema', () => {
        // let db
        // let sampleSize
        let schema
        beforeAll(async () => {
            // {
            //     name: "db1Connection",
            //     type: "mysql",
            //     host: "localhost",
            //     port: 3306,
            //     username: "root",
            //     password: "admin",
            //     database: "db1",
            //     entities: [__dirname + "/entity/*{.js,.ts}"],
            //     synchronize: true
            // }
            // schema = init_schemaql()
            // schema.db.addConnection({
            //     name: 'nameDB',
            //     type: 'sqlite',
            //     database: __dirname + 'schemaql.sqlite',
            //     // client: 'sqlite3',
            //     // connection: {
            //     //     filename: global.path
            //     // },
            // })
        })
        it('initialized global schemaDefs', () => {
            console.log('schemas::', schemas)
            // expect(schema).toEqual(expect.objectContaining({
            //     addSchema: expect.any(Function)
            // }))
        })

        it('add schemas', () => {
            schemas.add({
                name: 'sales',
                db: 'nameDB',
                fields: {
                    _id: uuid({ primary: true, unique: true }),
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

            schemas.add({
                name: 'salesmaterials',
                db: 'nameDB',
                fields: {
                    _id: uuid(({ primary: true, unique: true })),
                    _id_material: ref({
                        schemaName: 'catalogue_materials',
                        fieldName: '_id',
                        relation: relation.one_to_one
                    }),
                    cant: int()
                },
                extend: {
                    schema: 'sales',
                    key: '_id',
                    field: 'materials',
                    relation: relation.one_to_many,
                    resolver: 'custom|subtableDefault',
                },
            })

            schemas.add({
                name: 'catalogue_materials',
                db: 'nameDB',
                fields: {
                    _id: uuid(({ primary: true, unique: true })),
                    name: string()
                }
            })
            // console.log('schema.schema.get()::', schemas.get())
            // expect(schema.schema.get()).toEqual(expect.objectContaining({
            //     sales: expect.any(Object),
            //     sales_materials: expect.any(Object)
            // }))

        })
        // // it('init Database', async () => {
        // //     let result = await schema.db.init()
        // // })
        // it('startServer', async () => {
        //     let result = await schema.startServer()
        //     console.log('result::', result)
        // })
        // it('mutate schema', async () => {

        // })



    })
}