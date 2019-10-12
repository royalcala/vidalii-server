const R = require('ramda')

const test_find = ({ listFinds, databases_models_shards }) => {
    R.map(
        ({ databaseName, testingData }) =>
            R.map(
                ({ args: [arg1, arg2 = {}] }) => {
                    var model = databases_models_shards[databaseName]
                    test(`${databaseName}.find`, async () => {
                        let findResult = await model.find(arg1, arg2)
                        expect(R.has('_id', findResult[0])).toBe(true)                        
                    })

                }
            )(testingData)
    )(listFinds)
}

const test_insertOne = ({ listInserts, databases_models_shards }) => {
    R.map(
        ({ databaseName, testingData }) =>
            R.map(
                ({ args: [arg1, arg2 = {}] }) => {
                    var model = databases_models_shards[databaseName]
                    test(`${databaseName}.insertOne`, async () => {
                        let result = await model.insertOne(arg1, arg2)
                        //without shardsFilter, search in all db
                        let findResult = await model.find({
                            selector: { _id: { $eq: result._id } }
                        })
                        expect(R.has('_id', result)).toBe(true)
                        expect(R.has('_id', findResult[0])).toBe(true)
                        expect(result._id).toBe(findResult[0]._id)
                        //with shardsFilter
                        //     let findResultWithFilter = await model.find({
                        //         selector: { _id: { $eq: result._id } }
                        //     }, {
                        //         shardsFilter: ['local', 'remote']
                        //     })
                        //     expect(result._id).toBe(findResultWithFilter[0]._id)

                    })

                }
            )(testingData)
    )(listInserts)
}

const testCrud = (databases_models_shards) => {
    const processData = require('../../index.test.data').get()

    describe('databases_models_shards CRUD', () => {
        if (R.hasPath(['databases_models_shards', 'insertOne'], processData)) {
            test_insertOne({
                listInserts: processData.databases_models_shards.insertOne,
                databases_models_shards
            })
        }
        if (R.hasPath(['databases_models_shards', 'find'], processData)) {
            test_find({
                listFinds: processData.databases_models_shards.find,
                databases_models_shards
            })
        }


    })



}

module.exports = ({ databases, databases_models }) => {
    test('databases_models_shards Arguments', () => {
        expect(databases).toEqual(
            expect.any(Object)
        )
        expect(databases_models).toEqual(
            expect.any(Object)
        )
    })

    const databases_models_shards = require('./index')(
        { databases, databases_models }
    )

    test('databases_models result', () => {
        expect(databases_models_shards).toEqual(
            expect.any(Object)
        );
    })

    testCrud(databases_models_shards)



    return databases_models_shards

}