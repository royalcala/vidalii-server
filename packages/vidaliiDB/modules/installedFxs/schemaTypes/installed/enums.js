const R = require('ramda')
// const req = require('../requiredOnType')
// const formatType = require('../../../shared/graphql.formatType')


const condOptions = options => R.cond([
    [R.isNil, () => ({ type: '[String]' })],
    [R.T, options => options]
])(options)

module.exports = ()=>(arrayValueOptions, options) => {
    const initOptions = condOptions(options)
    return {
        // ...req,
        fx: ({ nameField, newValue = null }) => {

            if (newValue !== null) {
                throw new Error(`
            You cannot save value on the field:${nameField}, 
            its only a reference to other table`)
            }
            return 'hola'
        },
        type: initOptions.type
    }
}