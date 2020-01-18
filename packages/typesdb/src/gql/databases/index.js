import knex from './knex'

export default ({ dbs, getSchemas }) => {
    const store = {
        clients: {}
    }
    return {
        addClient: ({ type = 'knex', name, client, connection, useNullAsDefault = true }) => {
            try {
                if (store.clients[name])
                    console.log(`The clientdb:${name} will be remplaced with the new `)
                if (type === 'knex') {
                    store.clients[name] = {
                        type,
                        lib: require('knex')({
                            client,
                            connection,
                            useNullAsDefault
                        })
                    }
                }
            } catch (error) {
                return {
                    error
                }
            }



        },
        init: async () => {
            let schemas = getSchemas()
            let promises = []
            let nameSchema
            for (nameSchema in schemas) {
                let nameDB = schemas[nameSchema].db
                let { type, lib } = store.clients[nameDB]
                if (type === 'knex') {
                    promises.push(knex({
                        db: lib,
                        schema: schemas[nameSchema],
                        schemas
                    }))
                }

            }
            let response = await Promise.all(promises)
            return response
        }
    }
}