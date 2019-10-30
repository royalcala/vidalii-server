const dbTypes = require('./readInstalled')(__dirname + '/installed')
var fs = require('fs')
// const R = require('ramda')
// var path = require('path');
module.exports = (nameType = 'level', opt = {}) => ({ input }) => {
    const { db } = input
    const pathDB = db.dir + '/' + db.name
    if (!fs.existsSync(db.dir)) {
        fs.mkdirSync(db.dir);
    }
    if (!fs.existsSync(pathDB)) {
        fs.mkdirSync(pathDB);
    }
    const dirMain = pathDB + '/main'
    const dirRev = pathDB + '/rev'
    return {
        main: dbTypes[nameType](dirMain, opt),
        rev: dbTypes[nameType](dirRev, opt)
    }
}


