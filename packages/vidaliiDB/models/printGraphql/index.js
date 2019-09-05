const R = require('ramda')
const addTypes = require('./addTypes')
const firstUpper = require('./firstUpper')
const addQueries = require('./addQueries')
// const addResolverQuery = require('./addResolvers/query')

function main(schemas) {
    var storeTypes = addTypes({ schemas })
    var storeQueries = addQueries({ schemas })
    // var storeResolversQuery = addResolverQuery({ schemas })

    return {
        storeTypes,
        storeQueries
    }
}




module.exports = main 