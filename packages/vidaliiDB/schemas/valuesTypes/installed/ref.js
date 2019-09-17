const R = require('ramda')
const req = require('../requiredOnType')
// const firstUpper = require('packages/vidaliiDB/models/printGraphql/firstUpper.js')
const formatType = require('../../../graphql/formatType')

module.exports = (nameFromField, toTableName, toFieldName) => ({
    ...req,
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
        // console.log('models from JOIN::', models)
        // console.log('parent:', parent)
        // console.log('nameFromField', nameFromField)
        // console.log('path::', R.path([nameFromField], parent))
        // var valueNameFromField = R.path([nameFromField], parent)
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
        // return models[toTableName].join(data)
        // return await salesloader.load(parent.id_client)
        //build a dataloader that contain all the refs
        // console.log(parent)
        return 'Yeees'
    }
})