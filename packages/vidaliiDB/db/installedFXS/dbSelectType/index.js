const dbTypes = require('./readInstalled')(__dirname + '/installed')

module.exports = (nameType = 'level', opt = {}) => ({ input }) => {
    const { db } = input
    const completeDir = db.dir + '/' + db.name
    return dbTypes[nameType](completeDir, opt)
}


