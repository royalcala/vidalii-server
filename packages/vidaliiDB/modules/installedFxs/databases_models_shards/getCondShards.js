const R = require('ramda')
module.exports = ({ databases, databases_models }) => R.pipe(
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
                                ({ newDoc, options }) => databases_models[nameDatabase][nameShard].insertOne(newDoc, options)
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