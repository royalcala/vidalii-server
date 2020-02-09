import storeSDL from './StoreSDL'
import storeResolvers from './StoreResolvers'
import storeDirectives from './StoreDirectives'
import { makeExecutableSchema } from 'graphql-tools';

const { ApolloServer } = require('apollo-server-fastify')
const { graphql } = require('graphql')
// console.log(storeSDL.get('sdl'))
// console.log('RESOLVERS::', storeResolvers.getStore())
// const { types, queries, mutations, directives } = storeResolvers.getStore()

const executableSchema = makeExecutableSchema({
    typeDefs: storeSDL.get('gql'),
    ...storeResolvers.getStore('apollo')
});
export const serviveGraphql = new ApolloServer({
    typeDefs: storeSDL.get('gql'),
    ...storeResolvers.getStore('apollo')
})

const graphqlBuild = schema => query => graphql(schema, query)
export const query = graphqlBuild(executableSchema)
// graphql(schema, '{ hello }', root).then((response) => {
//     console.log(response);
//   });