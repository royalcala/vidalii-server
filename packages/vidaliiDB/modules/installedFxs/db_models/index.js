const R = require('ramda')

const extendCrud = require('./extendCrud')

// manage errors here
const initEachShardCRUD = ({ dbName }) => R.map(
    ([shardName, shardConfig]) => {
        const crud = shardConfig.typeDB.crud({
            shardConfig,
            url: shardConfig.url,
            dbName,
            shardName
        })
        console.log('extended::', extendCrud({ crud, shardName }))
        return {
            [shardName]: {
                ...crud,
                ...extendCrud({ crud, shardName })
            }
        }
    }
)

const initEachDbCRUD = ({ db }) => R.pipe(
    R.toPairs,
    R.map(
        ([dbName, shards]) => ({
            [dbName]: R.pipe(
                R.toPairs,
                initEachShardCRUD({ dbName }),
                R.mergeAll
            )(shards)
        })
    ),
    R.mergeAll
)(db)

module.exports = ({ db }) => {
    const init = initEachDbCRUD({ db })
    return init

    // const init = R.pipe(
    //     R.toPairs,
    //     R.map(
    //         ([nameModelType, fxModelType]) => ({
    //             [nameModelType]: fxModelType({ db })
    //         })
    //     ),
    //     R.mergeAll
    // )(modelsTypes)



    // return init.simple
}