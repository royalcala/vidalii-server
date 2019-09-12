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
                `${sdl}\n`
            )
        , 'type Query {\n'),
    R.concat(R.__, '}')
)(data)

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

module.exports = ({ schemas, models }) => {

    const mutations = getInstalled({
        schemas,
        models,
        installed: readInstalled(__dirname + '/installed')
    })

    const sdl = concatSDL(mutations)

    const resolvers = concatResolvers(mutations)


    return {
        querySDL: sdl,
        queryResolvers: resolvers
    }


}