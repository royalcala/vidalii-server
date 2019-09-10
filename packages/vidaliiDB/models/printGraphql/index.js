const R = require('ramda')
const addTypes = require('./addTypes')
const addQueries = require('./addQueries')
const addMutations = require('./addMutations')
const addQueriesAndMutations = require('./addQueriesAndMutations')


const sdlConcatTypesQueriesMutations = (types, queries, mutations) => R.pipe(
    R.concat(queries),
    R.concat(mutations)
)(types)


function main({ schemas, models }) {
    // console.log('schemas::', schemas)
    const { sdlTypes } = addTypes({ schemas })
    // console.log('types::', types)
    // const typesSDL = getTypesSDL(types)

    // const { querySDL, queryResolvers } = addQueries({ schemas, models })
    // console.log('q:::', 'sdl', querySDL, 'resolvers::', queryResolvers)
    const { querySDL, queryResolvers } = addQueriesAndMutations({ schemas, models })
    console.log('q:::', 'sdl', querySDL, 'resolvers::', queryResolvers)
    // var queries = addQueries({ schemas })
    // console.log('queries:', queries)
    // var mutations = addMutations({ schemas })
    // console.log('mutations::', mutations)



    // var resolvers = {}
    // resolvers.Query = addResolverQuery({ schemas, models })
    // console.log('resolvers:.', resolvers)

    // console.log('sdl:::',sdlConcatTypesQueriesMutations(typesSDL, querySDL, ' '))
    return {
        sdl: sdlConcatTypesQueriesMutations(sdlTypes, querySDL, ' '),
        queryResolvers,

        // types,
        // typesSLD,
        // queries,
        // resolvers,
        // sdl: sdlConcatTypesQueriesMutations
    }
}




module.exports = main 