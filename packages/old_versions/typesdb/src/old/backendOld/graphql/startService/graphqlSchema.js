import scalars from '../scalars'
import getGqlFromSchema from "../getGqlFromSchema";
import store_to_gql from '../store_to_gql'
const { gql } = require('apollo-server-fastify')

export default () => {
    let result = store_to_gql({ storeGql: getGqlFromSchema() })
    const typeDefs = gql`
        ${scalars.sdl}
        ${result.sdl.types}
        type Query{
            ${result.sdl.queries}
        }
        type Mutation{
            ${result.sdl.mutations}
        }
        `
    const resolvers = {
        ...scalars.resolvers,
        ...result.resolvers.types,
        Query: {
            ...result.resolvers.queries
        },
        Mutation: {
            ...result.resolvers.mutations
        }
    }
    return {
        typeDefs,
        resolvers
    }
}