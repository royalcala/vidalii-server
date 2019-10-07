const R = require('ramda')

const initialization = ({ databases }) => R.pipe(
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

module.exports = ({ databases }) => {
    const init = initialization({ databases })
    // console.log('models:::', init)
    return init
}