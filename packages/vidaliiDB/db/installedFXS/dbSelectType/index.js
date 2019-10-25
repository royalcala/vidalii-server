const dbTypes = require('./readInstalled')(__dirname + '/installed')
var fs = require('fs')
const R = require('ramda')
// var path = require('path');
//Extract the filename, but leave the file extension:


module.exports = (nameType = 'level', opt = {}) => ({ input }) => {
    const { db } = input
    // db.dir create dir if doesn exist, 
    // db.name create dir if doenst exist
    // let pathDB = path.dirname(db.dir) + '/' + db.name
    const pathDB = db.dir + '/' + db.name
    if (!fs.existsSync(db.dir)) {
        fs.mkdirSync(db.dir);
    }
    if (!fs.existsSync(pathDB)) {
        fs.mkdirSync(pathDB);
    }
    // const dirMain = db.dir + '/' + db.name + '/main'
    // const dirRev = db.dir + '/' + db.name + '/rev'
    const dirMain = pathDB + '/main'
    const dirRev = pathDB + '/rev'
    return {
        main: dbTypes[nameType](dirMain, opt),
        rev: dbTypes[nameType](dirRev, opt)
    }
}


