const R = require('ramda')
const formatType = require('../../formatType')

module.exports = ({ schemaName, schemaData, models }) => {
    const name = `${schemaName}_insertOne`
    return {
        sdl: `${name}(data:JSON, transaction:Boolean):${formatType({ child: schemaName })}`,
        resolverName: name,
        resolver: (parent, args, context, info) => {
            const { data = null, transaction = true } = args
            // let context = transaction === true ? '' : ''
            let result = models[schemaName].insertOne({ newDoc: data }).save()

            // console.log('result GQL::', result)
            return result
        },
    }
}