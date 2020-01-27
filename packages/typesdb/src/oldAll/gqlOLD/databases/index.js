import schemas from '../schemas'
import typeorm, { C_TYPEORM } from './typeorm'
// import knex from './knex'

const main = () => {
    const store = {
        connections: {}
    }
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
                        // synchronize: true
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
        startConnections: async () => {
            await typeorm.syncSchemas()
            // let storeSchemas = schemas.get()
            // let nameSchema
            // for (nameSchema in storeSchemas) {
            //     let nameDB = storeSchemas[nameSchema].db
            //     let typeDB = store.connections[nameDB]
            //     if (typeDB.orm === C_TYPEORM)
            //         typeorm.addEntitie(storeSchemas[nameSchema])
            // }
            // console.log('typeorm.get()::', typeorm.get())
        }

    }
}

export default main()