const R = require('ramda')

const formatType = require('../../formatType')
module.exports = ({ schemaName, schemaData, models }) => {

    return {
        sdl: `${schemaName}(query:String):[${formatType({ child: schemaName })}]`,
        resolverName: schemaName,
        resolver: (parent, args, context, info) => {
            const { query = null } = args
            let toJson = query !== null ? JSON.parse(query) : null
            return models[schemaName].find(toJson)
        },
    }


}