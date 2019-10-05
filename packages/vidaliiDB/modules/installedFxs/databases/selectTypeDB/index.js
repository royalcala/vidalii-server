const R = require('ramda')
const pouchDB = require('./pouchDB')

function selectTypeDB(data) {
    return R.cond([
        pouchDB,
        // [R.T, pouchDB[1]]
    ])(data)
}

module.exports = selectTypeDB