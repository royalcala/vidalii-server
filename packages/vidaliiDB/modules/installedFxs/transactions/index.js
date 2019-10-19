var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'))
const crud = require('./readInstalled')({
    pathToNodes: __dirname + '/installedCRUD'
})
// const uuidv4 = require('uuid/v4')

const useDBS = () => {
    var db = new PouchDB('./dbs/transactions')
    db.createIndex({
        index: { fields: ['idTransaction'] }
    });
    var db_committed = new PouchDB('./dbs/committed')
    var db_rollbacked = new PouchDB('./dbs/transactions')
    return {
        db,
        db_committed,
        db_rollbacked
    }
}
const main = () => {
    const { db, db_committed, db_rollbacked } = useDBS()
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


    return {
        getID: crud.getID,
        insertOne: crud.transaction({ db, type: 'insertOne', shardName }),
        updateOne: crud.transaction({ db, type: 'updateOne', shardName }),
        commit: crud.commit({ db }),
        rollback: crud.rollback({ db })
    }
}

module.exports = ({ db_models_shards }) => {

    return ''
}