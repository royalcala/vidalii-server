console.clear()
console.log('transactionsDB')
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'))
const crud = require('./readInstalled')({
    pathToNodes: __dirname + '/installedCRUD'
})
const uuidv4 = require('uuid/v4')

const main = () => {
    var db = new PouchDB('./dbs/transactions')
    db.createIndex({
        index: { fields: ['idTransaction'] }
    });
    const db_cache = () => {
        var store = {}
        return {
            remove: (idTransaction) => {
                delete store[idTransaction]
            },
            addTransaction: (idTransaction) => {

            }
        }
    }

    var db_committed = new PouchDB('./dbs/committed')
    var db_rollbacked = new PouchDB('./dbs/transactions')
    return {
        getID: crud.getID,
        insertOne: crud.transaction({ db, type: 'insertOne' }),
        updateOne: crud.transaction({ db, type: 'updateOne' }),
        commit: crud.commit({ db }),
        rollback: crud.rollback({ db })
    }
}
module.exports = ({ db_models_shards }) => {

    return ''
}