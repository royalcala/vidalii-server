// const req = require('../requiredOnType')
module.exports = () => ({
    // ...req,
    fx: ({ newValue }) => {
        return String(newValue)
    },
    type: 'String'
})