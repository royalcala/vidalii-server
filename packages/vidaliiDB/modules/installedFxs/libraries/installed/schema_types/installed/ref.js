const R = require('ramda')
// const req = require('../requiredOnType')

const formatType = require('../../../../../../shared/graphql.formatType')

module.exports = ()=>(nameFromField, toTableName, toFieldName) => ({
    // ...req,
    fx: ({ nameField, newValue = null }) => {
        if (newValue !== null) {
            throw new Error(`
            You cannot save value on the field:${nameField}, 
            its only a reference to other table`)
        }
        return 'hola'
    },
    // type: `[${firstUpper(toTableName)}]`,
    type: `${formatType({ child: toTableName })}`,
    // type: 'String',
    useTypeResolver: ({ models, schemaName }) => async (parent, args, context, info) => {
        const { models } = context
        let data = {
            fromField: {
                key: nameFromField,
                value: R.path([nameFromField], parent),
            },
            toField: {
                tableName: toTableName,
                fieldName: toFieldName
            }
        }
        let result = await models[toTableName].join(data)
        // console.log('result::', result)
        return result[0]
    }
})