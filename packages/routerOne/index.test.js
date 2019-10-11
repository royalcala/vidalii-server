
const databases_models = {
    insertOne: [
        {
            databaseName: 'testing',
            testingData: [
                {
                    shardName: 'local',
                    args: [
                        { branch: 'local' }
                    ]
                },
                {
                    shardName: 'remote',
                    args: [
                        { branch: 'remote' }
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
                        { branch: 'remote', msg: 'only one shard' }
                    ]
                }
            ]
        }
    ]
}

const databases_models_shards = {
    insertOne: [
        {
            databaseName: 'testing',
            testingData: [
                {
                    args: [
                        { branch: 'local', msg: 'testing shards' }
                    ]
                },
                {
                    args: [
                        { branch: 'remote', msg: 'testing shards' }
                    ]
                }
            ]
        }
    ]
}
require('@vidalii/db/modules/index.test.data').init(
    {
        data: {
            // databases_models,
            databases_models_shards
        }
    }
)

//process testing
require('@vidalii/db/modules/index.test')({
    pathToInputs: __dirname + '/config_router/input'
})