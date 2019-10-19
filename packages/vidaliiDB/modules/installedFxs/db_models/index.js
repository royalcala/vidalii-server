const R = require('ramda')

// manage errors here
const initEachShardCRUD = ({ dbName }) => R.map(
    ([shardName, shardConfig]) => {
        const crud = shardConfig.typeDB.crud({
            shardConfig,
            url: shardConfig.url,
            dbName,
            shardName
        })
        return {
            [shardName]: {
                ...crud,
                insertOne: async (newDoc = {}, options = {}) => {
                    let result = await crud.insertOne(newDoc, options)
                    return {
                        ...result,
                        db_models: {
                            shardName
                        }
                    }
                }
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