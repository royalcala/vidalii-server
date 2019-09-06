const R = require('ramda')
const addTypes = require('./addTypes')
const firstUpper = require('./firstUpper')
const addQueries = require('./addQueries')
const addResolverQuery = require('./addResolvers/Query')

function main({ schemas, models }) {    
    var types = addTypes({ schemas })
    var queries = addQueries({ schemas })
    var resolvers = {}
    resolvers.Query = addResolverQuery({ schemas, models })
    const sdlTypesQueries = R.pipe(
        R.toPairs,
        R.reduce((acc, [nameType, sdl]) => R.concat(acc, sdl), ''),
        R.concat(queries)
    )(types)


    return {
        types,
        queries,
        resolvers,
        sdl: sdlTypesQueries
    }
}




module.exports = main 