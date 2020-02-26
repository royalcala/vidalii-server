import { directives, scalars, sdls } from './loadFiles'
import context from './context'
const { ApolloServer } = require('apollo-server-fastify')






export default ({ typeDefs, resolvers, schemaDirectives, context } = {}) => {
    return new ApolloServer({
        typeDefs: `
        ${directives.sdls}
        ${scalars.sdls}
        ${sdls}
        `,
        resolvers: {
            ...scalars.resolvers,
        },
        schemaDirectives: {
            ...directives.resolvers
        },
        context
    })
}