const PouchDB = require('pouchdb')
var db = new PouchDB('./dbs/transactions')
const crud = require('./readInstalled')({
    pathToNodes: __dirname + '/installedCRUD'
})

module.exports = crud