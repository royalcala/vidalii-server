const R = require('ramda')

const firstUpper = require('../../firstUpper')
module.exports = ({ schemaName, schemaData, models }) => {

    return {
        sdl: `${schemaName}(query:String):[${firstUpper(schemaName)}]\n`,
        resolverName: schemaName,
        resolver: (parent, args, context, info) => {
            const { query = null } = args
            let toJson = query !== null ? JSON.parse(query) : null
            return models[schemaName].find(toJson)
        },
    }


}