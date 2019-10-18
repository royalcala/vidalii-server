const uuidv4 = require('uuid/v4')
// const req = require('../requiredOnType')
module.exports = () => ({
    // ...req,
    fx: ({ newValue = null }) => {
        // return newValue === null ? uuidv4() : newValue
        //remove from field on insert
        return newValue
    },
    type: 'ID'
})