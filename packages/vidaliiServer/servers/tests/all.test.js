const initSever = require('./initServers')

test('Init Local DataBase', async () => {
    const { ok, vidalii } = await initSever    
    // expect(ok).toBe(true)
    expect(vidalii).toEqual({
        pathToInputs: expect.any(String),
        input: expect.any(Object),
        schemas: expect.any(Object),
        databases: expect.any(Object),
        databases_models: expect.any(Object),
        databases_models_shards: expect.any(Object),
        // databases_schema_validation: expect.any(Object)        
    });
})

require('./test.databases_models')


require('./test.databases_models_shards')


