

async function serverLocalPouchDB() {
    var PouchDB = require('pouchdb');
    var express = require('express');
    var app = express();
    const port = 4000
    console.log('serverLocalPouchDB::::')
    var a = app.use(require('express-pouchdb')(PouchDB));
    console.log('a:::::',a)
    var b = app.listen(port);

    console.log('b:::::',b)
    console.log(`Server start on port ${port}`)
}


async function startServer() {
    // console.log('hhhhhh0')
    try {
        // serverLocalPouchDB()
        var vidalii = require('@vidalii/db/modules/index.test.js')({ pathToInputs: __dirname + '/input' })
        // console.log('hhhhhh3')
        // console.log('vidalii::', vidalii)
        return {
            ok: true,
            vidalii,
        }
    } catch (error) {
        console.log('error in startServer::', error)
        return error
    }

}

module.exports = startServer()
