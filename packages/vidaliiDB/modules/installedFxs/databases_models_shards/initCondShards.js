const R = require('ramda')

module.exports = ({ condShards }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameDatabase, condShard]) => ({
            [nameDatabase]: {
                insertOne: R.cond([
                    ...condShard.insertOne
                ]),
                find: async (mangoQuery = {}, opt = {}) => {
                    const { shardsFilter = [] } = opt
                    let results = await Promise.all(
                        R.cond([
                            [//without filter shard
                                R.isEmpty,
                                () => R.pipe(
                                    R.toPairs,
                                    R.map(
                                        ([nameShard, crudFind]) => {
                                            return crudFind(mangoQuery, opt)
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
                                        () => condShard.find[nameShard](mangoQuery, opt),
                                        () => []
                                    )(condShard.find)
                                ),
                                // R.flatten
                            ]
                        ])(shardsFilter)
                    )
                    // console.log('results:::', R.flatten(results))

                    return R.flatten(results)
                }
            }
        })
    ),
    R.mergeAll
)(condShards)