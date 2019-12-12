const R = require('ramda')
module.exports = (condShard) => (newDoc = {}, options = {}) => R.cond([
    ...condShard.insertOne
])({ newDoc, options })