const R = require('ramda')

const withShardsCrud = ({ condShards, databases_models }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameDatabase, shard]) => ''
    )
)(condShards)


const getCondShards = ({ databases, databases_models }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameDatabase, dataShards]) => ({
            [nameDatabase]: R.pipe(
                R.toPairs,
                R.reduce(
                    (acc, [nameShard, dataShard]) => ({
                        // ...databases_models[nameDatabase][nameShard],
                        insertOne: [
                            ...acc.insertOne,
                            [
                                dataShard.cond,
                                databases_models[nameDatabase][nameShard].insertOne
                            ]
                        ],
                        find: [
                            ...acc.find,
                            databases_models[nameDatabase][nameShard].find
                        ]
                    }),
                    {
                        insertOne: [],
                        find: []
                    }
                ),
                R.mergeAll
            )(dataShards)
        })
    )
)(databases)

// const initialization = ({ databases, databases_models }) => {
//     let condShards = getCondShards({ databases })
//     console.log('condShards::', condShards)
//     return ''
// }
module.exports = ({ databases, databases_models }) => {
    // console.log('input::', input)
    console.log('databases::', databases)
    console.log('databases_models::', databases_models)

    let condShards = getCondShards({ databases, databases_models })
    console.log('condShards::', condShards)

    let shardsCrud = withShardsCrud({ condShards, databases_models })
    console.log('shardsCrud', shardsCrud)


    // console.log('shards::', init)
    // console.log('init::', init)
    return ''
}