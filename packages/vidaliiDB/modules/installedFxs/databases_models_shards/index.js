const R = require('ramda')

const initCondShards = ({ condShards }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameDatabase, condShard]) => ({
            [nameDatabase]: {
                insertOne: R.cond([
                    ...condShard.insertOne
                ]),
                find: ({ shard = null, ...data }) => R.cond([
                    [R.equals(null), () => R.pipe(
                        R.toPairs,
                        R.map(
                            async ([nameShard, crudFind]) => {
                                return await crudFind(data)
                            }
                        )
                    )(condShard.find)]
                ])(shard)
            }
        })
    ),
    R.mergeAll
)(condShards)

const getCondShards = ({ databases, databases_models }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameDatabase, dataShards]) => ({
            [nameDatabase]: R.pipe(
                R.toPairs,
                R.reduce(
                    (acc, [nameShard, dataShard]) => ({
                        insertOne: [
                            ...acc.insertOne,
                            [
                                dataShard.cond,
                                databases_models[nameDatabase][nameShard].insertOne
                            ]
                        ],
                        find: {
                            ...acc.find,
                            [nameShard]: databases_models[nameDatabase][nameShard].find
                        },
                        get: {
                            ...acc.get,
                            [nameShard]: databases_models[nameDatabase][nameShard].get
                        },
                        replaceOne: {
                            ...acc.replaceOne,
                            [nameShard]: databases_models[nameDatabase][nameShard].replaceOne
                        }
                    }),
                    {
                        insertOne: [],
                        find: {},
                        get: {},
                        replaceOne: {}
                    }
                ),
                // R.mergeAll
            )(dataShards)
        })
    ),
    R.mergeAll
)(databases)

// const initialization = ({ databases, databases_models }) => {
//     let condShards = getCondShards({ databases })
//     console.log('condShards::', condShards)
//     return ''
// }
module.exports = ({ databases, databases_models }) => {
    // console.log('input::', input)
    // console.log('databases::', databases)
    // console.log('databases_models::', databases_models)

    // console.log('shardsTypesDB::', shardsTypesDB)

    let condShards = getCondShards({ databases, databases_models })
    // console.log('condShards::', condShards)
    let result = initCondShards({ condShards })
    // console.log('result::', result)


    // let shardsCrud = withShardsCrud({ condShards, databases_models })
    // console.log('shardsCrud', shardsCrud)


    // console.log('shards::', init)
    // console.log('init::', init)
    return result
}