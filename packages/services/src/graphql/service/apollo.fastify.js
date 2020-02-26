import { directives, scalars, sdls } from './loadFiles'
import context from './context'
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
const reducer = data => data.reduce(
    (acc, element) => {
        return {
            sdl: acc.sdl.concat('\n', element.sdl),
            resolver: { ...acc.resolver, ...element.resolver }
        }
    },
    {
        sdl: '',
        resolver: {}
    }
)

export default ({ scalars: [], directives: [], sdls: [], types: [], queries: [], mutations: [] }) => {
    const Scalar = reducer(scalars)
    const Directive = reducer(directives)
    const Sdl = reducer(sdls)
    const Types = reducer(types)
    const Queries = reducer(queries)
    const Mutations = reducer(mutations)
    return new ApolloServer({
        typeDefs: `
        ${Directive.sdl}
        ${Scalar.sdl}
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
    })
}


// export default ({ typeDefs, resolvers, schemaDirectives, context } = {}) => {
//     return new ApolloServer({
//         typeDefs: `
//         ${directives.sdls}
//         ${scalars.sdls}
//         ${sdls}
//         `,
//         resolvers: {
//             ...scalars.resolvers,
//         },
//         schemaDirectives: {
//             ...directives.resolvers
//         },
//         context
//     })
// }