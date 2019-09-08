const PouchDB = require('pouchdb')
const PouchDBFind = require('pouchdb-find')


module.exports = PouchDB.plugin(PouchDBFind)