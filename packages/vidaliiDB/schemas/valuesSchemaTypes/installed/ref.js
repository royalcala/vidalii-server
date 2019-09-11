const req = require('../requiredOnType')
// const firstUpper = require('packages/vidaliiDB/models/printGraphql/firstUpper.js')
const firstUpper = require('../../../models/printGraphql/firstUpper')

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
    useTypeResolver: (parent, args, context, info) => {

        console.log(parent)
        return 'Yeees'
    }
})