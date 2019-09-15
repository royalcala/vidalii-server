const PouchDB = require('pouchdb')
const PouchDBFind = require('pouchdb-find')
const dataLoaders = require('./dataloaders')

module.exports = ({ dataBase, dbName }) => async ({ fromField, toField, cache = true }) => {
    PouchDB.plugin(PouchDBFind)
    dataLoaders.load({
        dbName,
        fromField,
        toField,
        cache
    })
    // let query = queryMango === null ? { selector: { _id: { $gte: null } } } : queryMango
    // try {
    //     var response = await dataBase.find(query)
    //     return response.docs
    // } catch (err) {
    //     console.log(err);
    //     return err
    // }
}