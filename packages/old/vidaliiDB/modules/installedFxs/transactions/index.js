//test leveldown
var level = require('level')
// var levelup = require('levelup')
// var leveldown = require('leveldown')

// var PouchDB = require('pouchdb');
// PouchDB.plugin(require('pouchdb-find'))

///use leveldbdown
const uuidv4 = require('uuid/v4')

const useDBS = () => {
    var transaction = level('./dbs/transactions', { valueEncoding: 'json' })
    // var transactions = new PouchDB('./dbs/transactions')
    // transactions.createIndex({
    //     index: { fields: ['idTransaction'] }
    // });
    // var committed = new PouchDB('./dbs/committed')
    // var rollbacked = new PouchDB('./dbs/rollbacked')
    var committed = level('./dbs/committed', { valueEncoding: 'json' })
    var rollbacked = level('./dbs/rollbacked', { valueEncoding: 'json' })
    var errors = level('./dbs/errors', { valueEncoding: 'json' })
    return {
        dbs: {
            transactions,
            committed,
            rollbacked
        }
    }
}

const readTransactionsFromDB = () => new Promise((resolve, reject) => {
    var store = {}
    db.createReadStream()
        .on('data', function ({ key, value }) {
            const { idTransaction } = value
            const depuredData = R.dissoc('idTransaction', value)
            const existInMemory = () => {
                store[idTransaction].push({ _id: key, data: depuredData })
            }
            const notExistInMemory = () => {
                store[idTransaction] = []
                store[idTransaction].push({ _id: key, data: depuredData })
            }

            R.ifElse(
                R.has(idTransaction),
                existInMemory,
                notExistInMemory
            )(store)

        })
        .on('error', function (err) {
            console.log('Error reading on readTransactionsFromDB!', err)
        })
        .on('close', function () {
            console.log('Stream closed readTransactionsFromDB')
        })
        .on('end', function () {
            console.log('Stream ended readTransactionsFromDB')
            // console.log('store::', store)
            resolve(store)
        })
})

const cacheTransactions = ({ initialData = {}, db_models, db_models_shards }) => {
    const { dbs } = useDBS()
    var inMemoryStore = initialData
    return {
        addTransaction: ({ idTransaction, ...data }) => {
            const idForDB = uuidv4()
            const writeInPermanent = () => {
                dbs.transactions.put(idForDB, {
                    idTransaction,
                    data
                })
            }
            const writeInMemory = () => {
                if (inMemoryStore[idTransaction]) {
                    inMemoryStore[idTransaction].push({
                        _id: idForDB,
                        data
                    })
                } else {
                    inMemoryStore[idTransaction] = []
                    inMemoryStore[idTransaction].push({
                        _id: idForDB,
                        data
                    })
                }
            }

            writeInMemory()
            writeInPermanent()

        },
        commit: ({ idTransaction }) => {
            //move changes to db.committed in one row   
            //delete rows from table     

        },
        rollback: ({ idTransaction }) => {
            //check transaction in each row, change to previous doc
            //move transactions to one row on db.rollbacked
            if (inMemoryStore[idTransaction]) {
                const restoreDoc = (listTransactions) => R.pipe(
                    R.map(
                        async ({ _id, db, shardName, prevDoc, newDoc }) => {
                            let response = await db_models[db][shardName].replaceOne({
                                ...prevDoc,
                                _id,
                                _rev: newDoc._rev,
                            })

                            return {
                                _id, db, shardName,
                                response,
                                prevDoc,
                                newDoc
                            }
                        }
                    )
                )(listTransactions)
                const backupChanges = ({ idTransaction, listRestores }) => {
                    dbs.rollbacked.put(idTransaction, listRestores)
                }
                restoreDoc(inMemoryStore[idTransaction])
                backupChanges({ idTransaction, listRestores })


            }

        },
        onStartServer: () => {

        }
    }
}

const addCrudTypes = (cacheTransactions) => {
    return {
        ...cacheTransactions,
        insertOne: ({ idTransaction, db, shardName, prevDoc, newDoc }) => cacheTransactions.addTransaction({
            typeCRUD: 'insertOne',
            idTransaction, shardName, prevDoc, newDoc
        }),
        updateOne: ({ idTransaction, shardName, prevDoc, newDoc }) => crud.addTransaction({
            typeCRUD: 'updateOne',
            idTransaction, shardName, prevDoc, newDoc
        })
    }
}

module.exports = ({ db_models, db_models_shards }) => {

    let crud = cacheTransactions({ db_models, db_models_shards })

    let added_crudTypes = addCrudTypes(cacheTransactions)
    return added_crudTypes
}
// var leveldown = leveldown('./dbs/test')
// var db = levelup(leveldown)
var level2 = require('level')
db = level2('./dbs/test2', { valueEncoding: 'json' })

// 2) Put a key & value
db.put('name', [{ a: 1 }], function (err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error

    // 3) Fetch by key
    db.get('name', function (err, value) {
        if (err) return console.log('Ooops!', err) // likely the key was not found

        // Ta da!
        console.log('name1=' + value[0].a)
        // console.log('name:', JSON.parse(value.toString()))
    })
})

db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err) // likely the key was not found

    // Ta da!
    console.log('name=' + value)
})


var store = {}
let onRead = () => new Promise((resolve, reject) => {
    console.log('holis1')
    db.createReadStream()
        .on('data', function (data) {
            console.log('Buffers:', 'key:', data.key, 'value:', data.value)
            store[data.key] = data.value
        })
        .on('error', function (err) {
            console.log('Oh my!', err)
        })
        .on('close', function () {
            console.log('Stream closed')
        })
        .on('end', function () {
            console.log('Stream ended')
            // console.log('store::', store)
            resolve(store)
        })
    console.log('holis2')
    return 1
})

// onRead().then((result) => {
//     console.log('result::', result)
// })

async function hola() {
    console.log('uno')
    let result = await onRead()
    console.log('dos')
    console.log('result2:', result)
}

hola()
