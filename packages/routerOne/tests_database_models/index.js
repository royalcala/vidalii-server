const uuidv4 = require('uuid/v4')
const id1 = uuidv4()
const id2 = uuidv4()
const withID_insertOne = [
    {
        databaseName: 'testing',
        testingData: [
            {
                shardName: 'local',
                args: [
                    { _id: id1, branch: 'local', msg: 'manual with uuidv4' }
                ]
            },
            {
                shardName: 'remote',
                args: [
                    { _id: id2, branch: 'remote', msg: 'manual with uuidv4' }
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
                shardName: 'local',
                args: [
                    { branch: 'local', msg: 'manual shard' }
                ]
            },
            {
                shardName: 'remote',
                args: [
                    { branch: 'remote', msg: 'manual shard' }
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
                    { branch: 'remote', msg: 'manual shard' }
                ]
            }
        ]
    }
]
const databases_models = {
    insertOne: [
        ...noID_insertOne,
        ...withID_insertOne
    ],
    find: [
        {
            databaseName: 'testing',
            testingData: [
                {
                    shardName: 'local',
                    args: [
                        { selector: { _id: { $eq: id1 } } }
                    ]
                },
                {
                    shardName: 'remote',
                    args: [
                        { selector: { _id: { $eq: id2 } } }
                    ]
                }
            ]
        },
    ]
}

module.exports = databases_models