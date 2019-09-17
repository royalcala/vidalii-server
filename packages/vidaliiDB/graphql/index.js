const R = require('ramda')
// const printGraphql = require('./trash/printGraphql')
const getTypes = require('./getTypes')
const getQueriesAndMutations = require('./getQueriesAndMutations')

function main() {
    var storeModels = {}
    var storeSchemas = {}
    var storeGraphql = {}
    return {
        schemas: () => storeSchemas,
        models: () => storeModels,
        graphql: () => storeGraphql,
        buildGraphql: () => {
            // let { sdl, resolvers } = printGraphql({ schemas: storeSchemas, models: storeModels })
            // console.log('', sdl)
            // storeGraphql = { sdl, resolvers }
            // return storeGraphql
            let types = getTypes({ schemas: storeSchemas, models: storeModels })
            let QandM = getQueriesAndMutations({
                schemas: storeSchemas,
                models: storeModels
            })
            storeGraphql = {
                types,
                queries: QandM.queries,
                mutations: QandM.mutations,
                sdl: `${types.sdl} ${QandM.queries.sdl} ${QandM.mutations.sdl}`,
                resolvers: {
                    types,
                    Query: {
                        ...QandM.queries.resolvers
                    },
                    Mutation: {
                        ...QandM.mutations.resolvers
                    }
                }
            }
            return { ...storeGraphql }
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