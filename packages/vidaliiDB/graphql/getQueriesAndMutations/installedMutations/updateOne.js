const R = require('ramda')
const formatType = require('../../formatType')

module.exports = ({ schemaName, schemaData, models }) => {
    const name = `${schemaName}_updateOne`
    return {
        sdl: `${name}(data:JSON):${formatType({ child: schemaName })}`,
        resolverName: name,
        resolver: (parent, args, context, info) => {
            const { data = null } = args
            
            let result = models[schemaName].updateOne({ newDoc: { ...data } })
            return result
        },
    }
}