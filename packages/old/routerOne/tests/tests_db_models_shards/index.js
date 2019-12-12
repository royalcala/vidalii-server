const uuidv4 = require('uuid/v4')
const id1 = uuidv4()
const id2 = uuidv4()

const withID_insertOne = [
    {
        databaseName: 'testing',
        testingData: [
            {
                args: [
                    { _id: id1, branch: 'local', msg: 'manual ID, auto shards' }
                ]
            },
            {
                args: [
                    { _id: id2, branch: 'remote', msg: 'manual ID, auto shards' }
                ]
            }
        ]
    }
]
const noID_insertOne = [
    {
        databaseName: 'testing',
        testingData: [
            {
                args: [
                    { branch: 'local', msg: 'auto shards' }
                ]
            },
            {
                args: [
                    { branch: 'remote', msg: 'auto shards' }
                ]
            }
        ]
    },
    {
        databaseName: 'testingnoshards',
        testingData: [
            {
                shardName: 'remote',
                args: [
                    { branch: 'remote', msg: 'auto shard' }
                ]
            }
        ]
    }
]

const find_in_allShards = [
    {
        databaseName: 'testing',
        testingData: [
            {
                args: [
                    { selector: { _id: { $eq: id1 } } }
                ]
            },
            {
                args: [
                    { selector: { _id: { $eq: id2 } } }
                ]
            }
        ]
    }
]
const find_with_filterShard = [
    {
        databaseName: 'testing',
        testingData: [
            {
                args: [
                    { selector: { _id: { $eq: id1 } } },
                    { shardsFilter: ['local'] }
                ]
            },
            {
                args: [
                    { selector: { _id: { $eq: id2 } } },
                    { shardsFilter: ['remote'] }
                ]
            }
        ]
    }
]


const db_models_shards = {
    insertOne: [
        ...noID_insertOne,
        ...withID_insertOne
    ],
    find: [
        ...find_in_allShards,
        ...find_with_filterShard
    ]
}
module.exports = db_models_shards                                                                        