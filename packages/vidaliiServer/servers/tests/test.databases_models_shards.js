const initSever = require('./initServers')

describe('INSERT MULTIPLE SHARDS. Using databases_models_shards.testing', () => {
    test('.insertOne LOCAL', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models_shards
            .testing.insertOne({ newDoc: { branch: 'local' } })

        expect(result.ok).toBe(true)
    });

    test('.insertOne REMOTE', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models_shards
            .testing.insertOne({ newDoc: { branch: 'remote', msg: "from shard remote" } })
        expect(result.ok).toBe(true)
    });
})

describe('INSERT ONE SHARD. Using databases_models_shards.testingnoshards', () => {
    test('.insertOne LOCAL', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models_shards
            .testingnoshards.insertOne({ newDoc: { branch: 'local', msg: "with branch local" } })
        expect(result.ok).toBe(true)
    });

    test('.insertOne REMOTE', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models_shards
            .testingnoshards.insertOne({ newDoc: { branch: 'remote', msg: "with branch remote" } })
        expect(result.ok).toBe(true)
    });
})

describe('FIND MULTIPLE SHARD. Using databases_models_shards.testing', () => {
    test('.find WITHOUT FILTER SHARDS', async () => {
        const { vidalii } = await initSever
        // let result = await vidalii.databases_models_shards
        //     .testing.insertOne({ newDoc: { branch: 'local', msg: "with branch local" } })
        let result = await vidalii.databases_models_shards
            .testing.find(
                { selector: { _id: { $gte: null } } }
                // { selector: { _id: { $eq: '960e9191-0ffc-4096-b753-b1e529f517bb' } } }
                // { selector: { branch: { $eq: 'remote' } } }
            )
        // console.log(result)
        // expect(find).toBe(true)
        expect(Array.isArray(result)).toBe(true)
    });

    test('.find WITH FILTER SHARDS', async () => {
        const { vidalii } = await initSever
        // let result = await vidalii.databases_models_shards
        //     .testing.insertOne({ newDoc: { branch: 'local', msg: "with branch local" } })
        let result = await vidalii.databases_models_shards
            .testing.find(
                { selector: { _id: { $gte: null } } }
                // { selector: { _id: { $eq: '960e9191-0ffc-4096-b753-b1e529f517bb' } } }
                // { selector: { branch: { $eq: 'remote' } } }
                ,
                { shardsFilter: ['remote', 'local'] }
            )
        // console.log('result.lenght::',result)
        // expect(find).toBe(true)
        expect(Array.isArray(result)).toBe(true)
    });
})
