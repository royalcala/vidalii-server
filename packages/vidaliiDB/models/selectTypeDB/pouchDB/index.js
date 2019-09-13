const R = require('ramda')
const dataBase = require('./initDatabase')
const crud = require('./readInstalled')(__dirname + '/installedCRUD')

const main = ({ schemaTools, typeDB, schemaValidator, url, db, username, password }) => {

    // var dataBase = new PouchDB(`${url}/${db}`)
    var initData = {
        dataBase: dataBase({ url, dbName: db }),
        schemaTools,
        schemaValidator
    }
    return {
        insertOne: crud.insertOne(initData),
        find: crud.find(initData),
        join: crud.join(initData)
    }
}
const pouchDB = [
    ({ typeDB }) => R.equals('pouchDB'),
    main
]

module.exports = pouchDB