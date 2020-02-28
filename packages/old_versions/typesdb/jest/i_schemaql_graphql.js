import { removeDataBase } from '../../removeDatabase'
import { schemas, dbs, gql } from '../src/backend'
import { types } from '../src/backend'
import { getManager } from "typeorm";
const axios = require('axios');
export default () => {
    describe('graphql', () => {
        const port = 3000
        const url = `http://localhost:${port}/graphql`
        let location = __dirname + '/ischemaql.sqlite'
        const { int, string, ref, uuid, relation } = types
        beforeAll(async () => {
            removeDataBase({ location })


        })
        it('add a dbs.connection', async () => {
            dbs.addConnection({
                name: 'nameDB',
                type: 'sqlite',
                database: location
            })
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
                name: 'sales_materials',
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
                extend: { //not implement yet
                    schema: 'sales',
                    // primaries: ['_id'], automatic will get from schema(sales)
                    field: 'materials',
                    relation: relation.one_to_many,
                    // resolver: 'custom|subtableDefault',
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
                sales_materials: expect.any(Object),
                catalogue_materials: expect.any(Object)
            }))

        })
        it('startService', async () => {
            let response = await gql.startService({ port })
            // console.log('response::', response)
        })
        it('InsertOne Catalogue_materials', async () => {
            let response = await axios({
                url,
                method: 'post',
                data: {
                    query: `
                    mutation insert($data: JSON) {
                        insert_catalogue_materials(data:$data) {
                          _id
                        }
                      }`,
                    variables: {
                        data:
                        {
                            _id: '0',
                            name: 'material Zero'
                        }
                    }
                }
            })
            expect(response.status).toEqual(200)
            expect(response.data.errors).toEqual(undefined)
            expect(response.data.data).toEqual(
                expect.objectContaining({
                    insert_catalogue_materials: [
                        { _id: '0' }
                    ]
                })
            )
        })
        it('InsertMany Catalogue_materials', async () => {
            let response = await axios({
                url,
                method: 'post',
                data: {
                    query: `
                    mutation insert($data: JSON) {
                        insert_catalogue_materials(data:$data) {
                          _id
                        }
                      }`,
                    variables: {
                        data: [
                            {
                                _id: '1',
                                name: 'hi world!'
                            },
                            {
                                _id: '2',
                                name: 'hi world!'
                            }
                        ]
                    }
                }
            })
            // console.log('response2::', response)
            // console.log('Object.keys(response)::', Object.keys(response))
            // console.log('response.status::', response.status)            
            expect(response.status).toEqual(200)
            expect(response.data.errors).toEqual(undefined)
            expect(response.data.data).toEqual(
                expect.objectContaining({
                    insert_catalogue_materials: [
                        { _id: '1' }, { _id: '2' }
                    ]
                })
            )
        })
        it('InsertOne in Sales', async () => {
            let response = await axios({
                url,
                method: 'post',
                data: {
                    query: `
                    mutation insert($data: JSON) {
                        insert_sales(data:$data) {
                          _id
                        }
                      }`,
                    variables: {
                        data:
                        {
                            _id: '0',
                            folio: '100'
                        }
                    }
                }
            })
            expect(response.status).toEqual(200)
            expect(response.data.errors).toEqual(undefined)
            expect(response.data.data).toEqual(
                expect.objectContaining({
                    insert_sales: [
                        { _id: '0' }
                    ]
                })
            )
        })

        it('InsertOne in sales_materials', async () => {
            let response = await axios({
                url,
                method: 'post',
                data: {
                    query: `
                    mutation insert($data: JSON) {
                        insert_sales_materials(data:$data) {
                          _id
                        }
                      }`,
                    variables: {
                        data:
                            [
                                {
                                    _id: '0',
                                    _id_material: '0',
                                    cant: 11
                                },
                                // {
                                //     _id: '1',
                                //     _id_material: '1',
                                //     cant: 11
                                // },
                                // {
                                //     _id: '2',
                                //     _id_material: '2',
                                //     cant: 11
                                // }
                            ]
                    }
                }
            })
            expect(response.status).toEqual(200)
            expect(response.data.errors).toEqual(undefined)
            expect(response.data.data).toEqual(
                expect.objectContaining({
                    insert_sales_materials: [
                        { _id: '0' },
                        // { _id: '1' }, { _id: '2' }
                    ]
                })
            )
        })

        it('queryALL', async () => {
            let response = await axios({
                url,
                method: 'post',
                data: {
                    query: `
                    query getCharacter($filter: JSON = {}) {
                        find_catalogue_materials(filter:$filter) {
                          _id
                        }
                      }`,
                    // variables: { }
                }
            })
            expect(response.status).toEqual(200)
            expect(response.data.errors).toEqual(undefined)
            expect(response.data.data).toEqual(
                expect.objectContaining({
                    find_catalogue_materials: [
                        { _id: '0' }, { _id: '1' }, { _id: '2' }
                    ]
                })
            )

        })

        it('query with filter', async () => {
            let response = await axios({
                url,
                method: 'post',
                data: {
                    query: `
                    query getCharacter($filter: JSON) {
                        find_catalogue_materials(filter:$filter) {
                          _id
                        }
                      }`,
                    variables: { filter: { where: { _id: 1 } } }
                }
            })
            expect(response.status).toEqual(200)
            expect(response.data.errors).toEqual(undefined)
            expect(response.data.data).toEqual(
                expect.objectContaining({
                    find_catalogue_materials: [
                        { _id: '1' }
                    ]
                })
            )
        })

        it('query with filter $', async () => {
            let response = await axios({
                url,
                method: 'post',
                data: {
                    query: `
                    query getCharacter($filter: JSON) {
                        find_catalogue_materials(filter:$filter) {
                          _id
                        }
                      }`,
                    variables: {
                        filter: {
                            where: {
                                _id: ['$not', '$like', '0']
                            }
                        }
                    }
                }
            })
            // console.log('response.data.data::', response.data.data)
            expect(response.status).toEqual(200)
            expect(response.data.errors).toEqual(undefined)
            expect(response.data.data).toEqual(
                expect.objectContaining({
                    find_catalogue_materials: [
                        { _id: '1' }, { _id: '2' }
                    ]
                })
            )
        })

        it('query with ReferencedField', async () => {
            let response = await axios({
                url,
                method: 'post',
                data: {
                    query: `
                    query getCharacter($filter: JSON $filter2:JSON) {
                        find_sales_materials(filter:$filter) {
                          _id
                          _id_material(filter:$filter2){
                              _id
                              name
                          }
                        }
                      }`,
                    variables: {
                        filter2: {
                            where: [
                                {
                                    name: ['$like', 'material Zero']
                                },
                                // {
                                //     name: ['$not', '$like', 'material Zero']
                                // }
                            ]
                        }
                    }
                }
            })
            // console.log('response.data.data::', response.data.data)
            expect(response.status).toEqual(200)
            expect(response.data.errors).toEqual(undefined)
            expect(response.data.data).toEqual(
                expect.objectContaining({
                    find_sales_materials: [
                        {
                            _id: '0',
                            _id_material: {
                                _id: '0',
                                name: 'material Zero'
                            }
                        }
                    ]
                })
            )
        })




    })
}