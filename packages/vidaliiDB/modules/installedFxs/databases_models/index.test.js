const R = require('ramda')
var conectTests = {
    testOnlineDB: true
}

const testCrud = (databases_models) => {
    const processData = require('../../index.test.data').get()

    describe('databases_models check crud', () => {
        R.pipe(
            R.map(
                ({ databaseName, testingData }) => R.pipe(
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
                    )
                )(testingData)
            )
        )(processData.databases_models.insertOne)
    })
    // test('databases_models_CRUD', async () => {
    //     // console.log('processData::', processData)
    //     processData.databases_models.insertOne.map(
    //         ({ databaseName, testingData }) => {
    //             testingData.map(
    //                 async ({ shardName, args: [arg1, arg2 = {}] }) => {
    //                     console.log('shardName::', shardName)
    //                     // const { vidalii } = await initSever
    //                     // let result = await vidalii.databases_models.testing.local.insertOne({ newDoc: { branch: 'local' } })
    //                     console.log('hola1')
    //                     let result = await databases_models[databaseName][shardName].insertOne(arg1, arg2)
    //                     let findResult = await databases_models[databaseName][shardName].find({
    //                         selector: { _id: { $eq: result._id } }
    //                     })
    //                     console.log('hola2')
    //                     console.log('result._id::', result._id)
    //                     console.log('findResult[0]._id:::', findResult[0]._id)
    //                     expect(result._id).toBe(findResult[0]._id)
    //                 }
    //             )
    //         }
    //     )
    // })
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
                                }
                                expect(testConection.ok).toEqual(true)

                            })

                        }
                    )
                )(oShards)
            )
        )(databases_models)
    })

    return ''
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

    // databases_models.testing.local.info().then(
    //     x => console.log('info local', x)
    // )



    // databases_models.testing.remote.info().then(
    //     x => console.log('info remote', x)
    // )

    test('databases_models result', () => {
        expect(databases_models).toEqual(
            expect.any(Object)
        );
    })
    testOnlineDB(databases_models)
    if (conectTests.allOnline === true) {
        testCrud(databases_models)
    }
    // console.log('conectTests::',conectTests)
    // test('databases_models check databases local', async () => {
    //     let testConection = await databases_models.testing.local.info()
    //     expect(testConection.ok).toEqual(true)
    // })
    // test('databases_models check databases remote', async () => {
    //     let testConection = await databases_models.testing.remote.info()
    //     expect(testConection.ok).toEqual(true)
    // })
    // testDatabase({ databases_models })



    return databases_models

}