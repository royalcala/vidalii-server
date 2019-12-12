const R = require('ramda')
const insertOne = require('./installed/insertOne')
const find = require('./installed/find')

module.exports = ({ condShards }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameDatabase, condShard]) => ({
            [nameDatabase]: {
                insertOne: insertOne(condShard),
                find: find(condShard)
            }
        })
    ),
    R.mergeAll
)(condShards)