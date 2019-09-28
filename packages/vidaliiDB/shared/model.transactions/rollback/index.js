const R = require('ramda')
const PouchDB = require('pouchdb')
var db = new PouchDB('transactions')
const resultProcess = require('./resultProcess')

const processInParallel = async ({ rows, models }) => {
    // console.log('models::', models)
    let promises = rows.map(async ({ doc }) => {
        // console.log('document::', Object.keys(doc))
        // console.log('doc.model.schemaName::', doc.model.schemaName)
        try {
            // var docBackup = await db.get(doc._id)
            // var response = await db.put({
            //     ...doc.data.prev,
            //     _rev: doc.data.new._rev,
            // })
            let newDoc = {
                ...doc.data.prev,
                _rev: doc.data.new._rev,
                _id: doc.model._id
            }
            console.log('newDoc::', newDoc)
            let response = await models[doc.model.schemaName].replaceOne({
                newDoc,
                errorMsg: "From model.transactions.processInParallel "
            }).save()
            let resultConditional = resultProcess({ response, doc })
            return resultConditional
        } catch (error) {
            console.log('processInParallel:::', error)
            return error
        }
    });
    // wait until all promises are resolved
    let resolveAll = await Promise.all(promises);
    console.log('Resolved promises Done of Rollback!')
    return resolveAll
}

const rollback = async ({ models }) => {

    // db.info().then(function (info) {
    //     console.log(info);
    // })
    var transactions = await db.allDocs({ include_docs: true })
    // console.log('transactions:.',transactions)
    if (transactions.total_rows > 0) {

        return await processInParallel({ rows: transactions.rows, models })
    } {
        return "Doesnt exist documents to rollBack."
    }

}

module.exports = rollback