const R = require('ramda')
const firstUpper = require('../../firstUpper')

module.exports = ({ schemaName, schemaData, models }) => {
    const name = `${schemaName}_insertOne`
    return {
        sdl: `${name}(data:JSON):[${firstUpper(schemaName)}]`,
        resolverName: name,
        resolver: (parent, args, context, info) => {
            const { data = null } = args
            // let toJson = query !== null ? JSON.parse(query) : null
            // console.log('data::',args)
            return models[schemaName].insertOne(data)
        },
    }
}