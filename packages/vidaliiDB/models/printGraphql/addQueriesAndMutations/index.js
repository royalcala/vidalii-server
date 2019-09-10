const R = require('ramda')
const readInstalled = require('./readInstalled')


const extractResolversAndConcat = (data) => R.pipe(
    R.reduce(
        (acc, { resolver, resolverName }) =>
            R.assoc(
                resolverName,
                resolver,
                acc
            )
        , {})
)(data)

const extractSDlAndConcat = ({ object, sdlType }) => R.pipe(
    R.reduce(
        (acc, { sdl }) =>
            R.concat(
                acc,
                `${sdl}\n`
            )
        , sdlType),
    R.concat(R.__, '}')
)(object)

const getInstalled = ({ schemas, models, installed }) => R.pipe(
    R.toPairs,
    R.map(
        ([schemaName, schemaData]) => {
            return installed.map(
                ([nameFile, fx]) => fx({ schemaName, schemaData, models })
            )
        }
    ),
    R.flatten
)(schemas)

const getQueries = ({ schemas, models, sdlType, installedDir }) => {
    const objectQueries = getInstalled({
        schemas,
        models,
        installed: readInstalled(installedDir)
    })
    // console.log('queries:::', objectQueries)
    const sdl = extractSDlAndConcat({ object: objectQueries, sdlType })
    const resolvers = extractResolversAndConcat(objectQueries)
    return {
        sdl,
        resolvers
    }
}

module.exports = ({ schemas, models }) => {

    const queries = getQueries({
        schemas,
        models,
        sdlType: 'type Query {\n',
        installedDir: __dirname + '/installedQueries'
    })

    const mutations = getQueries({
        schemas,
        models,
        sdlType: 'type Mutations {\n',
        installedDir: __dirname + '/installedMutations'
    })

    return {
        queries: {
            sdl: queries.sdl,
            resolvers: queries.resolvers
        },

    }


}