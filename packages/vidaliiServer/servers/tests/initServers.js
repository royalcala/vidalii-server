const express = require('express');
const PouchDB = require('pouchdb');


async function startServer() {    
    var app = express();
    const port = 4000
    try {
        await app.use(require('express-pouchdb')(PouchDB));
        await app.listen(port);
        console.log(`Server start on port ${port}`)
        var vidalii = require('@vidalii/db/modules')({ pathToInputs: __dirname + '/input' })
       
        return {
            ok: true,
            vidalii,
        }
    } catch (error) {
        return error
    }

}

module.exports = startServer()
