import init_typeorm, { C_TYPEORM } from './typeorm'
import knex from './knex'

export default () => {
    const store = {
        connections: {}
    }
    const typeorm = init_typeorm()
    return {
        get: () => store,
        addConnection: ({ orm = C_TYPEORM, type = 'sqlite', name, database }) => {
            try {
                if (store.connections[name])
                    console.log(`The connection:${name} will be remplaced with the new `)
                if (orm === C_TYPEORM) {
                    store.connections[name] = {
                        orm,
                        type,
                        name,
                        database,
                        synchronize: true
                        // type,
                        // lib: require('knex')({
                        //     client,
                        //     connection,
                        //     useNullAsDefault
                        // })
                    }
                }
            } catch (error) {
                return {
                    error
                }
            }



        },
        init: async ({ oSchemas }) => {
            let schemas = oSchemas.get()
            let nameSchema
            for (nameSchema in schemas) {
                let nameDB = schemas[nameSchema].db
                let typeDB = store.connections[nameDB]
                if (typeDB.orm === C_TYPEORM)
                    typeorm.addEntitie(schemas[nameSchema])

                // let { type, lib } = store.clients[nameDB]
                // if (type === 'knex') {
                //     promises.push(knex({
                //         db: lib,
                //         schema: schemas[nameSchema],
                //         schemas
                //     }))
                // }
            }
            typeorm.init()
            // let response = await Promise.all(promises)
            // return response
        }
        // addClient: ({ type = 'knex', name, client, connection, useNullAsDefault = true }) => {
        //     try {
        //         if (store.clients[name])
        //             console.log(`The clientdb:${name} will be remplaced with the new `)
        //         if (type === 'knex') {
        //             store.clients[name] = {
        //                 type,
        //                 lib: require('knex')({
        //                     client,
        //                     connection,
        //                     useNullAsDefault
        //                 })
        //             }
        //         }
        //     } catch (error) {
        //         return {
        //             error
        //         }
        //     }

        // init: async ({ oSchemas }) => {
        //     let schemas = oSchemas.get()
        //     let promises = []
        //     let nameSchema
        //     for (nameSchema in schemas) {
        //         let nameDB = schemas[nameSchema].db
        //         let { type, lib } = store.clients[nameDB]
        //         if (type === 'knex') {
        //             promises.push(knex({
        //                 db: lib,
        //                 schema: schemas[nameSchema],
        //                 schemas
        //             }))
        //         }

        //     }
        //     let response = await Promise.all(promises)
        //     return response
        // }
    }
}