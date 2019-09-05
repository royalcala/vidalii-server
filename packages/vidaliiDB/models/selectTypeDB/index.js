const R = require('ramda')
const pouchDB = require('./pouchDB')

function selectTypeDB({...data}) {
    return R.cond([
        pouchDB
    ])(data)
}


module.exports = selectTypeDB