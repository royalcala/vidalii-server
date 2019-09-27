const R = require('ramda')
const formatType = require('../../../shared/graphql.formatType')
const transaction = require('../../../shared/model.transactions')

module.exports = ({ schemaName, schemaData, models }) => {
    const name = `${schemaName}_insertOne`
    return {
        sdl: `${name}(data:JSON, transaction:Boolean):${formatType({ child: schemaName })}`,
        resolverName: name,
        resolver: (parent, args, context, info) => {
            const { data = null, transaction = true } = args
            // let context = transaction === true ? '' : ''
            let result = models[schemaName].insertOne({ newDoc: data }).save()

            return result
        },
    }
}