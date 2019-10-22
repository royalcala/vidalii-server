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



const cacheTransactions = ({ db_models, db_models_shards }) => {
    const { dbs } = useDBS()
    var inMemoryStore = {}
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
                const existInMemory = () => {
                    inMemoryStore[idTransaction].push({
                        _id: idForDB,
                        data
                    })
                }
                const notExistInMemory = () => {
                    inMemoryStore[idTransaction] = []
                    inMemoryStore[idTransaction].push({
                        _id: idForDB,
                        data
                    })
                }

                R.ifElse(
                    R.has(data.idTransaction),
                    existInMemory,
                    notExistInMemory
                )(inMemoryStore)
            }

            writeInMemory()
            writeInPermanent()

        },
        commit: ({ idTransaction }) => {
            //move changes to db.committed in one row   
            //delete rows from table     

        },
        rollback: ({ idTransaction }) => {
            //check transaction and in each row, change to previous doc
            //move transactions to one row on db.rollbacked
        },
        onStartServer: () => {

        }
    }
}

const addCrudTypes = (cacheTransactions) => {
    return {
        ...cacheTransactions,
        insertOne: ({ idTransaction, shardName, prevDoc, newDoc }) => cacheTransactions.addTransaction({
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
db.put('name', { a: 1 }, function (err) {
    if (err) return console.log('Ooops!', err) // some kind of I/O error

    // 3) Fetch by key
    db.get('name', function (err, value) {
        if (err) return console.log('Ooops!', err) // likely the key was not found

        // Ta da!
        console.log('name=' + value.a)
        // console.log('name:', JSON.parse(value.toString()))
    })
})

db.get('name', function (err, value) {
    if (err) return console.log('Ooops!', err) // likely the key was not found

    // Ta da!
    console.log('name=' + value)
})

// db.get('name2').then(a => {
//     console.log('after promise::', a)
// }, e => {
//     console.log('error no encontrado')
// })



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
