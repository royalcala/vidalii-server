//instance data
require('@vidalii/db/modules/index.test.data').init(
    {
        databases_models: {
            inserts: []
        },
        databases_models_shards: {
            inserts: []
        }
    }
)

//process testing
require('@vidalii/db/modules/index.test')({
    pathToInputs: __dirname + '/config_router/input'
})