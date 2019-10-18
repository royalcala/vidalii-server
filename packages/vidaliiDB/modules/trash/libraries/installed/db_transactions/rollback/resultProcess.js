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

module.exports = resultProcess