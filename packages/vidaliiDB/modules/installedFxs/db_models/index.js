const R = require('ramda')
// const modelsTypes = require('./readInstalled')(__dirname + '/' + 'installedModelsTypes')

const initCRUD = ({ db }) => R.pipe(
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
)(db)

module.exports = ({ db }) => {
    const init = initCRUD({ db })
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