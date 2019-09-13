const req = require('../requiredOnType')
// const firstUpper = require('packages/vidaliiDB/models/printGraphql/firstUpper.js')
const firstUpper = require('../../../graphql/printGraphql/firstUpper')


module.exports = (idFrom, toTableName, toTableId) => ({
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
    type: 'String',
    useTypeResolver: async (parent, args, context, info) => {
        const { models } = context
        // console.log('models from context::',models)
        // return await salesloader.load(parent.id_client)
        //build a dataloader that contain all the refs
        // console.log(parent)
        return 'Yeees'
    }
})