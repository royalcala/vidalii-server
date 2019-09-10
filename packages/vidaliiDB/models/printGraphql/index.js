const R = require('ramda')
const addTypes = require('./addTypes')
const addQueries = require('./addQueries')
const addMutations = require('./addMutations')
const addResolverQuery = require('./addResolvers/Query')

const getQueries = require('./queries')

const sdlConcatTypesQueriesMutations = (types, queries, mutations) => R.pipe(
    R.concat(queries),
    R.concat(mutations)
)(types)

const getTypesSDL = (types) => R.pipe(
    R.toPairs,
    R.reduce((acc, [nameType, sdl]) => R.concat(acc, sdl), '')
)(types)

function main({ schemas, models }) {
    // console.log('schemas::', schemas)
    const types = addTypes({ schemas })
    // console.log('types::', types)
    const typesSDL = getTypesSDL(types)

    const { querySDL, queryResolvers } = getQueries({ schemas, models })
    // console.log('q:::', querySDL, queryResolvers)

    // var queries = addQueries({ schemas })
    // console.log('queries:', queries)
    // var mutations = addMutations({ schemas })
    // console.log('mutations::', mutations)



    // var resolvers = {}
    // resolvers.Query = addResolverQuery({ schemas, models })
    // console.log('resolvers:.', resolvers)

    // console.log('sdl:::',sdlConcatTypesQueriesMutations(typesSDL, querySDL, ' '))
    return {
        sdl: sdlConcatTypesQueriesMutations(typesSDL, querySDL, ' '),
        queryResolvers,
        
        // types,
        // typesSLD,
        // queries,
        // resolvers,
        // sdl: sdlConcatTypesQueriesMutations
    }
}




module.exports = main 