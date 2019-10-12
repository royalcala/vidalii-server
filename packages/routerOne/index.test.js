const databases_models = require('./tests_database_models')
const databases_models_shards = require('./tests_database_models_shards')
require('@vidalii/db/modules/index.test.data').init(
    {
        data: {
            databases_models,
            databases_models_shards
        }
    }
)

require('@vidalii/db/modules/index.test')({
    pathToInputs: __dirname + '/config_router/input'
})