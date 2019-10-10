const initSever = require('./initServers')

test('Init Local DataBase', async () => {
    const { ok, vidalii } = await initSever
    // console.log('vidaliiKeys::', Object.keys(vidalii))
    // expect(ok).toBe(true)
    // expect(vidalii).toEqual({
    //     pathToInputs: expect.any(String),
    //     input: expect.any(Object),
    //     schemas: expect.any(Object),
    //     validation: expect.any(Object),
    //     databases: expect.any(Object),
    //     databases_models: expect.any(Object),
    //     databases_models_shards: expect.any(Object),
    //     databases_models_shards_validation: expect.any(Object),

    // });
    expect(
        Object.keys(vidalii)
    ).toEqual(
        expect.arrayContaining([
            'pathToInputs',
            "input",
            "schemas",
            "validation",
            "databases",
            "databases_models",
            "databases_models_shards"
        ])
    );
})

require('./test.databases_models')


require('./test.databases_models_shards')


