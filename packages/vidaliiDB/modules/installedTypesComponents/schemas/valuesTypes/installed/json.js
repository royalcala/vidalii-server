const req = require('../requiredOnType')
module.exports = {
    ...req,
    fx: ({ newValue }) => {
        return newValue
    },
    type: 'JSON'
}