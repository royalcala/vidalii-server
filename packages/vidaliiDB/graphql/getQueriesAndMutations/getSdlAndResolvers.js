const R = require('ramda')
const readInstalled = require('./readInstalled')
const plugins = R.pipe(
    R.reduce(
        (acc, [name, fx]) => ({ ...acc, [name]: fx }),
        {}
    )
)(readInstalled(__dirname + '/installedPlugins'))
// reduce((acc, [name, fx]) => ({ ...acc, [name]: fx }), {})
// console.log('extraFxs::', extraFxs)

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
                ([nameFile, fx]) => fx({ schemaName, schemaData, models, plugins })
            )
        }
    ),
    R.flatten
)(schemas)

const getSdlAndResolvers = ({ schemas, models, sdlType, installedDir }) => {
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

module.exports = getSdlAndResolvers