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

const getQueries = ({ schemas, models }) => {

    const objectQueries = getInstalled({
        schemas,
        models,
        installed: readInstalled(__dirname + '/installedQueries')
    })
    console.log('queries:::', objectQueries)
    const querySDL = extractSDlAndConcat({ object: objectQueries, sdlType: 'type Query {\n' })
    const queryResolvers = extractResolversAndConcat(objectQueries)

}

module.exports = ({ schemas, models }) => {
    ///move all to the method
    const objectQueries = getInstalled({
        schemas,
        models,
        installed: readInstalled(__dirname + '/installedQueries')
    })
    console.log('queries:::', objectQueries)
    const querySDL = extractSDlAndConcat({ object: objectQueries, sdlType: 'type Query {\n' })
    const queryResolvers = extractResolversAndConcat(objectQueries)


    return {
        querySDL,
        queryResolvers
    }


}