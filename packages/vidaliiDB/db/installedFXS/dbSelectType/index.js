const dbTypes = require('./readInstalled')(__dirname + '/installed')

module.exports = (nameType = 'level', opt = {}) => () => {
    return dbTypes[nameType]
}


