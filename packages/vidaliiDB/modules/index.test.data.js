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
            // test(`example data`, () => {
            //     expect(data).toEqual(
            //         expect.objectContaining({
            //           databases_models: expect.any(Object),
            //           y: expect.any(Number),
            //         }),
            //       );
            // })
            dataStore = data
        },
        get: () => dataStore
    }
}

module.exports = initData()
