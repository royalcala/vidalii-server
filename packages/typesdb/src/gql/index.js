import init_schemas from './schemas'
import databases from './databases'
import init_oGraphql from './graphql'

export * from './schemas/fieldTypes'

export default () => {
    const { get, add } = init_schemas()
    const { addClient, init } = databases({ getSchemas: get })
    const { custom, schemaToStore,
        get: getGraphqlStore, mergeStores } = init_oGraphql({ getSchemas: get })
    return {
        graphql: {
            custom
        },
        db: {
            addClient,
            init
        },
        schema: {
            get,
            add
        },
        startServer: () => {
            //init storeSchemaGql
            let schemasStore = schemaToStore({ schemas: get() })
            console.log('schemasStore::',schemasStore)
            //init storeExternalGql
            let otherStore = getGraphqlStore()
            console.log('otherStore::',otherStore)
            //merge stores Gql
            let mergedStores = mergeStores(schemasStore, otherStore)

            //get services


            //init database

            //graphqlMerge = 2 stores:store schema + store graphql 
        }
    }
}