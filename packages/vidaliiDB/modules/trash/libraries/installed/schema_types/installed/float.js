// const req = require('../requiredOnType')
module.exports = () => ({
    // ...req,
    fx: ({ newValue }) => {
        return Number(newValue)
    },
    type: 'Float',
    isNodeType: true
})