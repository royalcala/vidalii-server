const R = require('ramda')
const readInstalled = require('./readInstalled')


const concatResolvers = (data) => R.pipe(
    R.reduce(
        (acc, { resolver, resolverName }) =>
            R.assoc(
                resolverName,
                resolver,
                acc
            )
        , {})
)(data)

const concatSDL = (data) => R.pipe(
    R.reduce(
        (acc, { sdl }) =>
            R.concat(
                acc,
                `${sdl}`
            )
        , 'type Query {\n'),
    R.concat(R.__, '}')
)(data)

const getQueries = ({ schemas, models, queriesInstalled }) => R.pipe(
    R.toPairs,
    R.map(
        ([schemaName, schemaData]) => {
            return queriesInstalled.map(
                ([nameFile, fx]) => fx({ schemaName, schemaData, models })
            )
        }
    ),
    R.flatten
)(schemas)

module.exports = ({ schemas, models }) => {

    const queries = getQueries({
        schemas,
        models,
        queriesInstalled: readInstalled(__dirname + '/installed')
    })

    const sdl = concatSDL(queries)

    const resolvers = concatResolvers(queries)


    return {
        querySDL: sdl,
        queryResolvers: resolvers
    }


}