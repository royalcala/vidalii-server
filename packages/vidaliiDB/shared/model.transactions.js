const R = require('ramda')
const uuidv4 = require('uuid/v4')
const PouchDB = require('pouchdb')
var db = new PouchDB('http://localhost:4000/transactions')

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

const processInParallel = async (array) => {
    const promises = array.map(async ({ doc }) => {
        console.log(doc)
        try {
            var doc = await db.get('mydoc');
            var response = await db.put({
                _id: 'mydoc',
                _rev: doc._rev,
                title: "Let's Dance"
            });
        } catch (err) {
            console.log(err);
        }
        return ''
    });
    // wait until all promises are resolved
    await Promise.all(promises);
    console.log('Done!');
}

const checkProcessStoppedAndRestore = async () => {
    db.info().then(function (info) {
        console.log(info);
    })
    var todos = await db.allDocs({ include_docs: true })
    // console.log(todos)
    if (todos.total_rows > 0) {
        return await processInParallel(todos.rows)
    } {

    }

}

const turnOn = async ({ models }) => {
    await checkProcessStoppedAndRestore({ models })
    return transactions()
}

module.exports = turnOn