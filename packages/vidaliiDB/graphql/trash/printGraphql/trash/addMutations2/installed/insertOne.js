const R = require('ramda')

const firstUpper = require('../../firstUpper')
module.exports = ({ schemaName, schemaData, models }) => {
    const name = `${schemaName}_insertOne`
    return {
        sdl: `${name}(data:JSON):[${firstUpper(schemaName)}]`,
        resolverName: name,
        resolver: (parent, args, context, info) => {
            const { query = null } = args
            let toJson = query !== null ? JSON.parse(query) : null
            return models[schemaName].insertOne(toJson)
        },
    }
}