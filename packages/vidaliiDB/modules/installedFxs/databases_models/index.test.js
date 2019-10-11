const R = require('ramda')
var conectTests = {
    testOnlineDB: true
}

const test_crud_insertOne = ({ listInserts, databases_models }) => {
    R.map(
        ({ databaseName, testingData }) =>
            R.map(
                ({ shardName, args: [arg1, arg2 = {}] }) => {
                    var model = databases_models[databaseName][shardName]
                    test(`${databaseName}.${shardName}.insertOne`, async () => {
                        let result = await model.insertOne(arg1, arg2)
                        let findResult = await model.find({
                            selector: { _id: { $eq: result._id } }
                        })
                        expect(result._id).toBe(findResult[0]._id)
                    })

                }
            )(testingData)
    )(listInserts)
}

const testCrud = (databases_models) => {
    const processData = require('../../index.test.data').get()

    describe('databases_models TEST CRUD', () => {
        if (R.hasPath(['databases_models', 'insertOne'], processData)) {
            test_crud_insertOne({
                listInserts: processData.databases_models.insertOne,
                databases_models
            })
        }
    })

}

const testOnlineDB = (databases_models) => {
    describe('databases_models online check', () => {
        R.pipe(
            R.toPairs,
            R.map(
                ([nameDB, oShards]) => R.pipe(
                    R.toPairs,
                    R.map(
                        ([nameShard, crud]) => {
                            test(`${nameDB}.${nameShard}`, async () => {
                                let testConection = await crud.info()
                                if (testConection.ok === false) {
                                    conectTests.testOnlineDB = false
                                    // console.log(testConection)
                                }
                                expect(testConection.ok).toEqual(true)

                            })

                        }
                    )
                )(oShards)
            )
        )(databases_models)
    })

}

module.exports = ({ databases }) => {
    test('databases_models Arguments', () => {
        expect(databases).toEqual(
            expect.any(Object)
        )
    })
    const databases_models = require('./index')({
        databases
    })

    test('databases_models result', () => {
        expect(databases_models).toEqual(
            expect.any(Object)
        );
    })
    testOnlineDB(databases_models)
    if (conectTests.testOnlineDB === true) {
        testCrud(databases_models)
    }



    return databases_models

}