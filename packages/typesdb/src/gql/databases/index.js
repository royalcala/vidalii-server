import schemas from '../schemas'
import typeorm, { C_TYPEORM } from './typeorm'
// import knex from './knex'

const main = () => {
    const store = {
        connections: {},

    }
    return {
        get: () => store,
        addConnection: ({ orm = C_TYPEORM, type = 'sqlite', name, database }) => {
            if (store.connections[name])
                console.log(`The connection:${name} will be remplaced with the new `)
            if (orm === C_TYPEORM) {
                store.connections[name] = {
                    orm,
                    type,
                    name,
                    database,
                    // synchronize: true
                    // type,
                    // lib: require('knex')({
                    //     client,
                    //     connection,
                    //     useNullAsDefault
                    // })
                }
            }
        },
        init: async () => {
            await typeorm.init()
            // save in store insert, update, find,
            // const storeSchemas = schemas.get()

            // for (nameSchema in storeSchemas){

            // }
        }

    }
}

export default main()