const R = require('ramda')

module.exports = ({ condShards }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameDatabase, condShard]) => ({
            [nameDatabase]: {
                insertOne: (newDoc = {}, options = {}) => R.cond([
                    ...condShard.insertOne
                ])({ newDoc, options }),
                find: async (mangoQuery = {}, options = {}) => {
                    const { shardsFilter = [] } = options
                    let resultsPromises = R.cond([
                        [//without filter shard
                            R.isEmpty,
                            () => R.pipe(
                                R.toPairs,
                                R.map(
                                    ([nameShard, crudFind]) => {
                                        return crudFind(mangoQuery, options)
                                    }
                                ),
                                // R.flatten
                            )(condShard.find)
                        ],
                        [//with filter shardsFilter
                            R.T,
                            R.map(
                                (nameShard) => R.ifElse(
                                    R.has(nameShard),
                                    () => condShard.find[nameShard](mangoQuery, options),
                                    () => []
                                )(condShard.find)
                            ),
                            // R.flatten
                        ]
                    ])(shardsFilter)

                    let results = await Promise.all(resultsPromises)

                    return R.flatten(results)
                }
            }
        })
    ),
    R.mergeAll
)(condShards)