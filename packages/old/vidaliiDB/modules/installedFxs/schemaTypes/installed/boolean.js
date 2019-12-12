// const req = require('../requiredOnType')
module.exports = () => ({
    // ...req,
    fx: ({ newValue }) => {
        return Boolean(newValue)
    },
    type: 'Boolean'
})