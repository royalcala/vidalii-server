const initData = () => {
    var dataStore = {
        databases_models: {
            inserts: []
        },
        databases_models_shards: {
            inserts: []
        }
    }
    return {
        init: ({ data }) => {
            dataStore = data
        },
        get: () => dataStore
    }
}

module.exports = initData()
