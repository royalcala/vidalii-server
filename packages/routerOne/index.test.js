//instance data
require('@vidalii/db/modules/index.test.data').init(
    {
        data: {
            databases_models: {
                inserts: [1]
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