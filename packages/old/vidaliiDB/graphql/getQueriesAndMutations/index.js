const R = require('ramda')
const getSdlAndResolvers = require('./getSdlAndResolvers')

module.exports = ({ schemas, models }) => {

    const queries = getSdlAndResolvers({
        schemas,
        models,
        sdlType: 'type Query {\n',
        installedDir: __dirname + '/installedQueries'
    })

    const mutations = getSdlAndResolvers({
        schemas,
        models,
        sdlType: 'type Mutation {\n',
        installedDir: __dirname + '/installedMutations'
    })

    return {
        queries: {
            sdl: queries.sdl,
            resolvers: queries.resolvers
        },
        mutations: {
            sdl: mutations.sdl,
            resolvers: mutations.resolvers
        }
    }


}