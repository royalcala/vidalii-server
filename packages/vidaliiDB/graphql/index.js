const R = require('ramda')
const printGraphql = require('./printGraphql')

function main() {
    var storeModels = {}
    var storeSchemas = {}
    var storeGraphql = {}
    return {
        schemas: () => storeSchemas,
        models: () => storeModels,
        graphql: () => storeGraphql,
        buildGraphql: () => {
            let { sdl, resolvers } = printGraphql({ schemas: storeSchemas, models: storeModels })
            console.log('', sdl)
            storeGraphql = { sdl, resolvers }
            return storeGraphql
        },
        load: ({ schemas, models }) => {
            storeSchemas = {
                ...storeSchemas,
                ...schemas
            }
            storeModels = {
                ...storeModels,
                ...models
            }
        }

    }

}

module.exports = main