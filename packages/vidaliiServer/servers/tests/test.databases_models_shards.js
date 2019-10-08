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
    test('.find LOCAL', async () => {
        const { vidalii } = await initSever
        // let result = await vidalii.databases_models_shards
        //     .testing.insertOne({ newDoc: { branch: 'local', msg: "with branch local" } })
        let find = await vidalii.databases_models_shards
            .testing.find(
                { selector: { _id: { $gte: null } } }
            )
        expect(result.ok).toBe(true)
    });
})
