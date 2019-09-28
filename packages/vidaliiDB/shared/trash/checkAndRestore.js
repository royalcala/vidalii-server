const R = require('ramda')
const PouchDB = require('pouchdb')
var db = new PouchDB('http://localhost:4000/transactions')

const ifCorrectChangeToPrevious = [
    ({ response }) => R.equals(true, response.ok),
    ({ doc, response }) => {
        doc.time = {
            lastProcess: new Date().toISOString()
        }
        doc.status = response
        db.put(doc)
        return ''
    }
]

const ifConflict = [
    ({ response }) => R.equals('conflict', response.error),
    ({ doc, response }) => {
        // console.log('write that ther is a conflict with the _rev')
        doc.time = {
            lastProcess: new Date().toISOString()
        }
        doc.status = response
        db.put(doc)
        return ''
    }
]
const resultProcess = data => R.cond([
    ifConflict,
    ifCorrectChangeToPrevious
])(data)


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
    console.log('Resolved promises Done!')
    return resolveAll
}

const checkAndRestore = async ({ models }) => {

    // db.info().then(function (info) {
    //     console.log(info);
    // })
    var transactions = await db.allDocs({ include_docs: true })
    // console.log('transactions:.',transactions)
    if (transactions.total_rows > 0) {

        return await processInParallel({ rows: transactions.rows, models })
    } {
        return "Doesnt exist documents to restore."
    }

}

module.exports = checkAndRestore