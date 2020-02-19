import storeSDL from './StoreSDL'
import storeResolvers from './StoreResolvers'
import { makeExecutableSchema } from 'graphql-tools';
const { ApolloServer } = require('apollo-server-fastify')
const { graphql } = require('graphql')

const executableSchema = makeExecutableSchema({
    typeDefs: storeSDL.get('gql'),
    ...storeResolvers.getStore('apollo') //has {resolvers,schemaDirectives}
});
const jwt = require('jsonwebtoken')

const getUser = token => {
    try {
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET)
        }
        return null
    } catch (err) {
        console.log('Erro jwt verification.', err);
        return null
    }
}
export const serviveGraphql = new ApolloServer({
    typeDefs: storeSDL.get('gql'),
    ...storeResolvers.getStore('apollo'),
    context: ({ req }) => {
        const tokenWithBearer = req.headers.authorization || ''
        const token = tokenWithBearer.split(' ')[1]
        const user = getUser(token)

        return {
            user
        }
    }
})

const graphqlBuild = schema => query => graphql(schema, query)
export const query = graphqlBuild(executableSchema)
// graphql(schema, '{ hello }', root).then((response) => {
//     ;
//   });