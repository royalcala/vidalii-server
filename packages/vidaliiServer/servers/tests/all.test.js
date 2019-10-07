// startTestings()

// async function startTestings() {
//     const servers = await require('./initServers')()
//     test('init database', () => expect(servers.ok).toBe(true));
//     console.log('listo')

// }

// function sum(a, b) {
//     return a + b;
//   }

// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });

// test('init server database', async () => {

// });

// describe('Testing VidaliiDB', () => {
const initSever = require('./initServers')()
// try {

// test('test1', () => {
//     const object = {
//         a: () => '',
//         b: { c: 1 }
//     }
//     expect(object).toEqual({
//         a: expect.any(Function),
//         b: { c: 1 }
//     });
// });

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
});

describe('Using databases_models.testing', () => {
    test('.local.insertOne ', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models.testing.local.insertOne({ newDoc: { branch: 'local' } })
        // console.log(result)
        expect(result.ok).toBe(true)
    });

    test('.remote.insertOne ', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models.testing.remote.insertOne({ newDoc: { branch: 'remote' } })
        // console.log(result)
        expect(result.ok).toBe(true)
    });
})

describe('IN SHARDS WITH SHARDS. Using databases_models_shards.testing', () => {
    test('.insertOne LOCAL', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models_shards.testing.insertOne({ newDoc: { branch: 'local' } })
        // console.log(result)
        expect(result.ok).toBe(true)
    });

    test('.insertOne REMOTE', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models_shards.testing.insertOne({ newDoc: { branch: 'remote', msg: "from shard remote" } })
        // console.log(result)
        expect(result.ok).toBe(true)
    });
})

describe('IN SHARDS WITHOUT SHARDS. Using databases_models_shards.testingnoshards', () => {
    test('.insertOne LOCAL', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models_shards.testingnoshards.insertOne({ newDoc: { branch: 'local', msg: "with branch local" } })
        // console.log(result)
        expect(result.ok).toBe(true)
    });

    test('.insertOne REMOTE', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models_shards.testingnoshards.insertOne({ newDoc: { branch: 'remote', msg: "with branch remote" } })
        // console.log(result)
        expect(result.ok).toBe(true)
    });
})

// });

