import init_schemas from './schemas'
import init_databases from './databases'
import init_oGraphql from './graphql'

export * from './schemas/fieldTypes'




export default () => {
    // const { getSchemas, addSchema } = init_schemas()
    const oSchemas = init_schemas()
    const oDatabases = init_databases()
    // const { addClient, initdbs } = databases()

    // const { custom, schemaToStore,
    //     get: getGraphqlStore, mergeStores } = init_oGraphql()
    const oGraphql = init_oGraphql()
    return {
        graphql: {
            addCustom: oGraphql.custom
        },
        db: {
            addClient: oDatabases.addClient,
            // init: initdbs({ schemas })
        },
        schema: {
            ...oSchemas
        },
        startServer: async () => {
            //init databases
            await oDatabases.init({ oSchemas })

            //init storeSchemaGql
            const graphqlSchema = oGraphql.getGraphqlFromSchema({ oSchemas, oDatabases })
            console.log('graphqlSchema::', graphqlSchema)
            //init storeExternalGql
            // let otherStore = getGraphqlStore()
            // console.log('otherStore::', otherStore)
            //merge stores Gql
            // let mergedStores = mergeStores(schemasStore, otherStore)

            //get services


            //init database

            //graphqlMerge = 2 stores:store schema + store graphql 
        }
    }
}