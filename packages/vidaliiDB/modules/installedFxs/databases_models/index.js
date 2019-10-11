const R = require('ramda')
// const modelsTypes = require('./readInstalled')(__dirname + '/' + 'installedModelsTypes')

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
    return init

    // const init = R.pipe(
    //     R.toPairs,
    //     R.map(
    //         ([nameModelType, fxModelType]) => ({
    //             [nameModelType]: fxModelType({ databases })
    //         })
    //     ),
    //     R.mergeAll
    // )(modelsTypes)



    // return init.simple
}