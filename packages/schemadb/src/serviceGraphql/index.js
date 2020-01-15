import createServicesGQL from './createServicesGQL'
import { mergeDeepRight } from 'ramda'
// import createTypes from './createTypes'
// import createSearchByTypeDef from './createSearchByTypeDef'
const { ApolloServer, gql } = require('apollo-server-fastify');

// const books = [
//     {
//         title: 'Harry Potter and the Chamber of Secrets',
//         author: 'J.K. Rowling',
//     },
//     {
//         title: 'Jurassic Park',
//         author: 'Michael Crichton',
//     },
// ]
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
// const resolvers = {
//     Query: {
//         books: () => books,
//     },
//     Mutation: {}
// }
const getResolversQueries = oResolvers => {
    let resolvers = {}
    oResolvers.forEach(
        obj => {
            resolvers = {
                ...resolvers,
                ...obj
            }
        }
    )
    return resolvers
}
const getResolversMutations = oResolvers => {
    let resolvers = {}
    oResolvers.forEach(
        obj => {
            resolvers = {
                ...resolvers,
                ...obj
            }
        }
    )
    return resolvers
}
const getResolversTypes = oResolvers => {
    let resolvers = {}
    oResolvers.forEach(
        ({ path, fx }) => {
            let propertyName = path.pop()
            let nameObj = path.join('_')

            resolvers = mergeDeepRight(resolvers, {
                [nameObj]: {
                    [propertyName]: fx
                }
            })
        }
    )

    return resolvers
}
const getSDL_from_oMutations = oMutations => {
    let sdl = ''
    oMutations.forEach(
        obj => {
            sdl = sdl.concat(`${obj.sdl}\n`)
        }
    )
    return sdl
}

const getSDL_from_oQueries = oQueries => {
    let sdl = ''
    oQueries.forEach(
        obj => {
            sdl = sdl.concat(`${obj.sdl}\n`)
        }
    )
    return sdl
}

const getSDL_from_oTypes = oTypes => {
    let sdl = ''
    Object.entries(oTypes).forEach(
        ([nameType, fields]) => {
            // console.log('nameType::', nameType)
            // console.log('fields::', fields)
            sdl = sdl.concat(`type ${nameType}{\n`)
            fields.forEach(
                obj => {
                    sdl = sdl.concat(`${obj.nameField}:${obj.typeField}\n`)
                }
            )
            sdl = sdl.concat(`}\n`)
        }
    )
    return sdl
}

//schema definition language:sdl
export default async ({ name, schema, db }) => {
    const oGql = createServicesGQL({ name, schema, db })
    const sdlTypes = getSDL_from_oTypes(oGql.types)
    const sdlQueries = getSDL_from_oQueries(oGql.queries)
    const sdlMutations = getSDL_from_oMutations(oGql.mutations)
    const resolversTypes = getResolversTypes(oGql.resolvers.types)
    const resolversMutations = getResolversMutations(oGql.resolvers.mutations)
    const resolversQueries = getResolversQueries(oGql.resolvers.queries)
    console.log('oGql::', oGql)
    console.log('sdlTypes::', sdlTypes)
    console.log('sdlQueries::', sdlQueries)
    console.log('sdlMutations::', sdlMutations)
    console.log('resolversTypes::', resolversTypes)
    console.log('resolversMutations::', resolversMutations)
    console.log('resolversQueries::',resolversQueries)
    // return new ApolloServer({
    //     typeDefs: gql(`
    //     ${typeDefs.string}
    //     ${queries}
    //     `),
    //     resolvers,
    // })
}

// const app = require('fastify')();

// (async function () {
//   app.register(server.createHandler());
//   await app.listen(3000);
// })();
