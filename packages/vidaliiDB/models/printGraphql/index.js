const R = require('ramda')
const addTypes = require('./addTypes')
const addQueriesAndMutations = require('./addQueriesAndMutations')


const sdlConcatTypesQueriesMutations = (types, queries, mutations) => R.pipe(
    R.concat(queries),
    R.concat(mutations)
)(types)


function main({ schemas, models }) {
    // console.log('schemas::', schemas)
    const { sdlTypes, resolversTypes } = addTypes({ schemas })
    // console.log('types::', types)
    // const typesSDL = getTypesSDL(types)

    // const { querySDL, queryResolvers } = addQueries({ schemas, models })
    // console.log('q:::', 'sdl', querySDL, 'resolvers::', queryResolvers)
    const { queries, mutations } = addQueriesAndMutations({ schemas, models })
    // console.log('q:::', 'sdl', queries.sdl, 'resolvers::', queries.resolvers)
    // var queries = addQueries({ schemas })
    // console.log('queries:', queries)
    // var mutations = addMutations({ schemas })
    // console.log('mutations::', mutations)



    // var resolvers = {}
    // resolvers.Query = addResolverQuery({ schemas, models })
    // console.log('resolvers:.', resolvers)

    // console.log('sdl:::',sdlConcatTypesQueriesMutations(typesSDL, querySDL, ' '))
    return {
        sdl: sdlConcatTypesQueriesMutations(sdlTypes, queries.sdl, mutations.sdl),
        resolvers: {
            type: resolversTypes,
            query: queries.resolvers,
            mutation: mutations.resolvers
        }
        // queryResolvers: queries.resolvers,


        // types,
        // typesSLD,
        // queries,
        // resolvers,
        // sdl: sdlConcatTypesQueriesMutations
    }
}




module.exports = main 