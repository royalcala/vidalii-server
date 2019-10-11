const initSever = require('./initServers')

describe('Using databases_models.testing INSERT', () => {
    test('.local.insertOne ', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models.testing.local.insertOne({ newDoc: { branch: 'local' } })
        let findResult = await vidalii.databases_models.testing.local.find({
            selector: { _id: { $eq: result._id } }
        })
        expect(result._id).toBe(findResult[0]._id)
        //   expect(result.ok).toBe(true)
    });

    test('.remote.insertOne ', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models
            .testing.remote.insertOne({ newDoc: { branch: 'remote' } })
        let findResult = await vidalii.databases_models.testing.remote.find({
            selector: { _id: { $eq: result._id } }
        })
        expect(result._id).toBe(findResult[0]._id)
        // expect(result.ok).toBe(true)
    });

})

describe('Using databases_models.testing FIND', () => {
    test('.local.find without {query:querymangoFormat} parameter', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models.testing.local.find()
        expect(Array.isArray(result)).toBe(true)
    });

    test('.remote.find without {query:querymangoFormat} parameter', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models.testing.remote.find()
        expect(Array.isArray(result)).toBe(true)
    });

    test('.local.find with {query:querymangoFormat} parameter', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models.testing
            .local.find({
                selector: { _id: { $eq: "00637d58-5c66-40f4-8bc8-fc8003fd6d52" } }
            })
        // console.log('una query::', result)
        expect(Array.isArray(result)).toBe(true)
    });

    test('.remote.find with {query:querymangoFormat} parameter', async () => {
        const { vidalii } = await initSever
        let result = await vidalii.databases_models.testing
            .remote.find(
                { selector: { _id: { $gte: null } } }
            )
        // console.log('remote::', result)
        expect(Array.isArray(result)).toBe(true)
    });

})