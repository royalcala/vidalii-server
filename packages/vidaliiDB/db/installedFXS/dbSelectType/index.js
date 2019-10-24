const dbTypes = require('./readInstalled')(__dirname + '/installed')

module.exports = (nameType = 'level', opt = {}) => ({ input }) => {
    const { db } = input
    const dirMain = db.dir + '/' + db.name + '/main'
    const dirRev = db.dir + '/' + db.name + '/rev'
    return {
        main: dbTypes[nameType](dirMain, opt),
        rev: dbTypes[nameType](dirRev, opt)
    }
}


