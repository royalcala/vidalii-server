// import init_schemas from './schemas'
// import init_databases from './databases'
// import init_oGraphql from './graphql'
export { default as schemas } from './schemas'
export { default as dbs } from './databases'
export { default as gql } from './graphql'
import * as types from './schemas/types'
export { types }
// export default {
//     schemas
// }
// export default () => {
//     // const { getSchemas, addSchema } = init_schemas()
//     // const oSchemas = init_schemas()
//     // const oDatabases = init_databases()
//     // const { addClient, initdbs } = databases()

//     // const { custom, schemaToStore,
//     //     get: getGraphqlStore, mergeStores } = init_oGraphql()
//     // const oGraphql = init_oGraphql()
//     return {
//         graphql: {
//             // addCustom: oGraphql.custom
//         },
//         db: {
//             // addConnection: oDatabases.addConnection,
//             // init: initdbs({ schemas })
//         },
//         schemas: {
//             ...schemas
//         },
//         startServer: async () => {
//             //init databases
//             // await oDatabases.init({ oSchemas })
//             //init storeSchemaGql
//             // const graphqlSchema = oGraphql.getGraphqlFromSchema({ oSchemas, oDatabases })
//             // console.log('graphqlSchema::', graphqlSchema)
//             // console.log(' graphqlSchema.resolvers.types.salesmaterials::', graphqlSchema.resolvers.types.salesmaterials)
//             //init storeExternalGql
//             // let otherStore = getGraphqlStore()
//             // console.log('otherStore::', otherStore)
//             //merge stores Gql
//             // let mergedStores = mergeStores(schemasStore, otherStore)

//             //get services


//             //init database

//             //graphqlMerge = 2 stores:store schema + store graphql 
//         }
//     }
// }