import { loadModules, loadGraphqls } from "./loadPath";
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
const isPath = ({ path, type }) => {
    switch (type) {
        case 'module':
            return loadModules(path)
        case 'graphql':
            return loadGraphqls(path)
    }
}
const reducer = (data, type = 'module') => data.reduce(
    (acc, element) => {
        let response
        if (typeof element === 'string') {
            response = isPath({ path: element, type })
        } else
            response = element

        return {
            sdl: acc.sdl.concat('\n', response.sdl),
            resolver: { ...acc.resolver, ...response.resolver }
        }
    },
    {
        sdl: '',
        resolver: {}
    }
)

export default ({ context = null, scalars = [], directives = [], sdls = [], types = [], queries = [], mutations = [] } = {}) => {
    const Scalar = reducer(scalars)
    const Directive = reducer(directives)
    const Sdl = reducer(sdls, 'graphql')
    const Types = reducer(types)
    const Queries = reducer(queries)
    const Mutations = reducer(mutations)
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
