import { removeDataBase } from '../../removeDatabase'
import { createConnection, createConnections, Connection } from "typeorm";
// import { getConnectionManager, ConnectionManager, Connection } from "typeorm";
import { EntitySchema } from "typeorm";
import { getManager, getRepository, getConnection } from "typeorm";
// import {Film} from './entities/one'
export default () => {
    let sampleSize
    describe('typeorm', () => {
        let path1 = __dirname + '/1.sqlite'
        let path2 = __dirname + '/2.sqlite'
        let path3 = __dirname + '/3.sqlite'
        let entities = []
        beforeAll(async () => {
            // removeDataBase({ location: path1 })
            // removeDataBase({ location: path2 })
            // removeDataBase({ location: path3 })
            sampleSize = global.sampleSize


        })
        afterAll(async () => {

        })

        it('create Entities', async () => {
            const CategoryEntity1 = new EntitySchema({
                name: "category1",
                columns: {
                    id: {
                        type: Number,
                        primary: true,
                        generated: true
                    },
                    name: {
                        type: String
                    },
                    // folio: {
                    //     type: Number
                    // }
                }
            });
            const CategoryEntity2 = new EntitySchema({
                name: "category2",
                columns: {
                    id: {
                        type: Number,
                        primary: true,
                        generated: true
                    },
                    name: {
                        type: String
                    }
                }
            });
            const CategoryEntity3 = new EntitySchema({
                name: "category3",
                columns: {
                    id: {
                        type: Number,
                        primary: true,
                        generated: true
                    },
                    name: {
                        type: String
                    }
                }
            });
            entities.push(CategoryEntity1, CategoryEntity2, CategoryEntity3)
        })

        it('createOne Connection ', async () => {
            const connection = await createConnection({
                name: 'one',
                type: "sqlite",
                database: path1,
                entities: [entities[0]],
                logging: true,
                logger: 'advanced-console',
                synchronize: true,
            });
            // const connection2 = await createConnection({
            //     name: 'one',
            //     type: "sqlite",
            //     database: path2,
            //     // entities: [User, Message],
            //     // logging: true
            // });
            // console.log('connection::', connection)

        })
        it('createMany Connections', async () => {
            const connections = await createConnections([
                {
                    name: 'two',
                    type: "sqlite",
                    database: path2,
                    entities: [entities[1]],
                    // logging: true,
                    // logger: 'advanced-console',
                    synchronize: true,
                },
                {
                    name: 'three',
                    type: "sqlite",
                    database: path3,
                    entities: [...entities],
                    // logging: true,
                    // logger: 'advanced-console',
                    synchronize: true,
                }]);
            // console.log('connections::', connections)
            // console.log('getConnection()::', getConnection('two').manager.find('table1'))
        })
        it('crud.EntityManager', async () => {
            // const entityManager = getManager()//default name if is not specificated
            const entityManager = getManager('one')
            // category.name = "first name on db one table category1";
            let response = await entityManager.save('category1', { name: 'hola1' });
            expect(response).toEqual(
                expect.objectContaining({
                    id: 1,
                    name: 'hola1'
                })
            )


            response = await entityManager.findOne('category1', 1);
            expect(response).toEqual(
                expect.objectContaining({
                    id: 1,
                    name: 'hola1'
                })
            )
            //update
            response = await entityManager.save('category1', { id: 1, name: 'hola updated' });
            expect(response).toEqual(
                expect.objectContaining({
                    id: 1,
                    name: 'hola updated'
                })
            )
            //insert
            response = await entityManager.save('category1', { name: 'hola2' });
            expect(response).toEqual(
                expect.objectContaining({
                    id: 2,
                    name: 'hola2'
                })
            )
            //find and merge with the object loaded
            response = await entityManager.preload('category1', { id: 1, name: 'merge with this object' });
            expect(response).toEqual(
                expect.objectContaining({
                    id: 1,
                    name: 'merge with this object'
                })
            )
        })

        it('crud..Repository', async () => {
            // const userRepository = getRepository('category1', 'one'); // you can also get it via getConnection().getRepository() or getManager().getRepository()
            // const category = await userRepository.findOne(1);
            // console.log('category in  repository::', category)
            // category.name = "changed in repository";
            // let response = await userRepository.save(category);
            // console.log('response::', response)
        })

        // it('bulk insert', async () => {

        //     let rows = []
        //     for (let index = 0; index < sampleSize; index++) {
        //         rows.push({
        //             // folio: index,
        //             name: 'car number ' + index
        //         })

        //     }
        //     const entityManager = getManager('one')
        //     await entityManager.save('category1', rows);

        // })
        it('bulk with query builder.isTheFaster', async () => {

            let rows = []
            for (let index = 0; index < sampleSize; index++) {
                rows.push({
                    // folio: index,
                    name: 'car number ' + index
                })

            }
            let promises = []

            await getConnection('one').transaction(async transactionalEntityManager => {
                while (rows.length) {
                    promises.push(
                        transactionalEntityManager
                            .createQueryBuilder()
                            .insert()
                            .into('category1')
                            .values(rows.splice(0, 999))
                            .execute()
                    )
                }
            });

            // while (rows.length) {
            //     promises.push(
            //         getConnection('one')
            //             .createQueryBuilder()
            //             .insert()
            //             .into('category1')
            //             .values(rows.splice(0, 499))
            //             .execute()
            //     )
            // }
            
            try {
                await Promise.all(promises)
            } catch (error) {
                console.log('error::', error)
            }
            // await getConnection('one')
            //     .createQueryBuilder()
            //     .insert()
            //     .into('category1',)
            //     .values(rows)
            //     .execute()

        })
        // it('bulk with repository chunk', async () => {

        //     let rows = []
        //     for (let index = 0; index < sampleSize; index++) {
        //         rows.push({
        //             // folio: index,
        //             name: 'car number ' + index
        //         })

        //     }


        //     const userRepository = await getRepository('category1', 'one');
        //     await userRepository.save(rows, { chunk: 1000 });
        // })


    })//end description



}