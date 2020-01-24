import scalars from './scalars'
import { sdl, resolvers } from './composition'
import getGraphqlFromSchema from "./getGraphqlFromSchema";
import { initStore, populateStore } from './structureStore'
import store_to_gql from './store_to_gql'
const { ApolloServer, gql } = require('apollo-server-fastify')
const webServer = require('fastify')()
const main = () => {
    const customStore = initStore()
    const addCustom = populateStore({ sdl, resolvers, store: customStore })

    return {
        addCustom,
        get: () => customStore,
        getGraphqlFromSchema,
        startService: async ({ port = 3000 } = {}) => {
            let result = store_to_gql({ storeGql: getGraphqlFromSchema() })
            console.log('result::', result)
            //next work with merge
            //work with start apollo server
            //test find, insertOne, conditions in find
            return result
        }
    }
}

export default main()