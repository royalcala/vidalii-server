const db_models = require('./tests/tests_db_models')
const db_models_shards = require('./tests/tests_db_models_shards')
require('@vidalii/db/modules/index.test.data').init(
    {
        data: {
            db_models,
            db_models_shards
        }
    }
)

require('@vidalii/db/modules/index.test')({
    pathToInputs: __dirname + '/config_router/input',    
})