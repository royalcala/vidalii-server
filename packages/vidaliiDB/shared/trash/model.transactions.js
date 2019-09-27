const R = require('ramda')
const uuidv4 = require('uuid/v4')
const PouchDB = require('pouchdb')
var db = new PouchDB('http://localhost:4000/transactions')

//unique uuid by machine running a vidaliiDB
const uuidMachine = "a74f2532-bb3d-4689-b136-9a468b63aedc"

const transactions = () => {
    var storeTransactions = {}
    return {
        new: () => {
            return storeTransactions[uuidv4()] = () => {
                var storeModels = []
                return {
                    load: (modelBeforeSave) => {
                        storeModels.push(modelBeforeSave)
                    },
                    save: () => {
                        //go through each array
                        try {
                            storeModels.map(
                                async (fx) => {
                                    //1.-
                                    let result = await fx.save()
                                    //2.-Save changes in the document with the uuidv4 connected

                                }
                            )
                            // mark db transactions deleted
                        } catch (error) {
                            //3.- remove all the changes
                        }
                    }
                }
            }
        },
        select: (id) => storeTransactions[id],

    }
}


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
            let response = models[doc.model.schemaName].replaceOne({
                newDoc: {
                    ...doc.data.prev,
                    _rev: doc.data.new._rev
                },
                errorMsg: "From model.transactions.processInParallel "
            }).save()

            return response
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

module.exports = {
    checkAndRestore,
    transactions
}