const R = require('ramda')
module.exports = ({ databases }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameDatabase, shards]) => ({
            [nameDatabase]: R.pipe(
                R.toPairs,
                R.map(
                    ([nameShard, dataShard]) => ({
                        [nameShard]: dataShard.typeDB.crud({
                            url: dataShard.url,
                            dbName: nameDatabase
                        })
                    })
                ),
                R.mergeAll
            )(shards)
        })
    ),
    R.mergeAll
)(databases)