import { removeDataBase } from '../../removeDatabase'
import { schemas, dbs, gql } from '../src/backend'
import { types } from '../src/backend'
import { getManager } from "typeorm";
const axios = require('axios');
export default () => {
    describe('schema', () => {
        // let db
        // let sampleSize
        let location = __dirname + '/ischemaql.sqlite'
        const { int, string, ref, uuid, relation } = types
        beforeAll(async () => {
            removeDataBase({ location })
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


        })
        it('add a dbs.connection', async () => {
            dbs.addConnection({
                name: 'nameDB',
                type: 'sqlite',
                database: location,
                // client: 'sqlite3',
                // connection: {
                //     filename: global.path
                // },
            })
            // console.log('dbs.get()::', dbs.get())
            expect(dbs.get()).toEqual(
                expect.objectContaining({
                    connections: {
                        nameDB: expect.any(Object)
                    }
                })
            )
        })

        it('add schemas', () => {
            schemas.add({
                name: 'sales',
                connection: 'nameDB',
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
                connection: 'nameDB',
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
                connection: 'nameDB',
                fields: {
                    _id: uuid(({ primary: true })),
                    name: string()
                }
            })
            // console.log('schema.schema.get()::', schemas.get())
            expect(schemas.get()).toEqual(expect.objectContaining({
                sales: expect.any(Object),
                salesmaterials: expect.any(Object),
                catalogue_materials: expect.any(Object)
            }))

        })
        it('test Database', async () => {
            let nameConnection = 'nameDB'
            let nameTable = 'catalogue_materials'
            await dbs.init()
            const manager = getManager(nameConnection); // you can also get it via getConnection().manager
            //insert
            await manager.save(nameTable, { _id: '1', name: 'name1' });
            let response = await manager.findOne(nameTable, 1)
            expect(response).toEqual(
                expect.objectContaining({
                    _id: '1',
                    name: 'name1'
                })
            )
            //update
            await manager.save(nameTable, { _id: '1', name: 'nameUpdated' });
            response = await manager.findOne(nameTable, 1)
            expect(response).toEqual(
                expect.objectContaining({
                    _id: '1',
                    name: 'nameUpdated'
                })
            )
            //insertMany
            await manager.save(nameTable, [
                { _id: '2', name: 'name' },
                { _id: '3', name: 'name' }
            ]);
            response = await manager.find(nameTable);
            expect(response).toEqual(
                expect.objectContaining([
                    { _id: '1', name: 'nameUpdated' },
                    { _id: '2', name: 'name' },
                    { _id: '3', name: 'name' },
                ])
            )
            //removeOne
            await manager.remove(nameTable, { _id: '1' });
            response = await manager.find(nameTable);
            expect(response).toEqual(
                expect.objectContaining([
                    { _id: '2', name: 'name' },
                    { _id: '3', name: 'name' },
                ])
            )

        })
        it('test graphql', async () => {
            const port = 3000
            let response = await gql.startService({ port })
            const url = `http://localhost:${port}/graphql`
            response = await axios({
                url,
                method: 'post',
                data: {
                    query: `{
                        find_catalogue_materials {
                          _id
                        }
                      }`
                }
            })
            // console.log('response2::', response)
            // console.log('Object.keys(response)::', Object.keys(response))
            // console.log('response.status::', response.status)
            // console.log('response.data::', response.data.data)
            expect(response.status).toEqual(200)
            expect(response.data.errors).toEqual(undefined)
            expect(response.data.data).toEqual(
                expect.objectContaining({
                    find_catalogue_materials: [
                        { _id: '2' }, { _id: '3' }
                    ]
                })
            )

        })
        it('test find with Operations', async () => {

        })



    })
}