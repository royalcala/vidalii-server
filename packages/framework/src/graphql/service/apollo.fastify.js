import reducer from "./tools/reducerPaths";
const { ApolloServer } = require('apollo-server-fastify')
/*
estructure of array elements: 
module.exports = {
    sdl: `scalar JSON`,
    resolver: { JSON: GraphQLJSON }
}
sdls:
must to be extend Query, and extend Mutation
*/

// scalars: [
//     fromFramework1, fromFramework2,
//     fromCustomReadPath
// ]
// { context = null, scalars = [], directives = [], sdls = [], types = [], queries = [], mutations = [] } 
export default (reducerOptions = {}) => {
    const { Scalar, Directive, Types, Sdl, Queries, Mutations, context } = reducer(reducerOptions)    
    return new ApolloServer({
        typeDefs: `
        ${Scalar.sdl}
        ${Directive.sdl}
        ${Types.sdl}
        ${Sdl.sdl}
            type Query{
            ${Queries.sdl}
            hellow:String
            }
            type Mutation{
            ${Mutations.sdl}
            hellow:String
            }
        `,
        resolvers: {
            ...Scalar.resolver,
            ...Types.resolver,
            Query: {
                hellow: () => 'world!',
                ...Queries.resolver,
            },
            Mutation: {
                hellow: () => 'world!',
                ...Mutations.resolver,
            }
        },
        schemaDirectives: {
            ...Directive.resolver
        },
        context
    }).createHandler()
}
