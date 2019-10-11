//instance data
require('@vidalii/db/modules/index.test.data').init(
    {
        data: {
            databases_models: {
                insertOne: [
                    {
                        databaseName: 'testing',
                        testingData: [
                            {
                                shardName: 'local',
                                args: [
                                    { newDoc: { branch: 'local' } }
                                ]
                            },
                            {
                                shardName: 'remote',
                                args: [
                                    { newDoc: { branch: 'remote' } }
                                ]
                            },
                        ]
                    }
                ]
            },
            databases_models_shards: {
                inserts: [2]
            }
        }
    }
)

//process testing
require('@vidalii/db/modules/index.test')({
    pathToInputs: __dirname + '/config_router/input'
})