const uuidv4 = require('uuid/v4')

module.exports = {
    fx: ({newValue}) => {
        return uuidv4()
    },
    type: 'ID'
}