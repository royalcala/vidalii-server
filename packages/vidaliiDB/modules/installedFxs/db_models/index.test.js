const R = require('ramda')
var conectTests = {
    testOnlineDB: true
}

const test_find = ({ listFinds, db_models }) => {
    R.map(
        ({ databaseName, testingData }) =>
            R.map(
                ({ shardName, args: [arg1, arg2 = {}] }) => {
                    var model = db_models[databaseName][shardName]
                    test(`${databaseName}.${shardName}.find`, async () => {
                        // let result = await model.find(arg1, arg2)
                        // let findResult = await model.find({
                        //     selector: { _id: { $eq: result._id } }
                        // })
                        let findResult = await model.find(arg1, arg2)
                        expect(R.has('_id', findResult[0])).toBe(true)
                        // expect(result._id).toBe(findResult[0]._id)
                    })

                }
            )(testingData)
    )(listFinds)
}

const test_insertOne = ({ listInserts, db_models }) => {
    R.map(
        ({ databaseName, testingData }) =>
            R.map(
                ({ shardName, args: [arg1, arg2 = {}] }) => {
                    describe(`${databaseName}.${shardName}.insertOne`, () => {
                        var model = db_models[databaseName][shardName]
                        var pointerResult = null
                        test(`exec(
                            arg1:${JSON.stringify(arg1)},
                            arg2:${JSON.stringify(arg2)},
                            result is correct?, has _id?`, async () => {
                            let result = await model.insertOne(arg1, arg2)
                            pointerResult = result
                            let findResult = await model.find({
                                selector: { _id: { $eq: result._id } }
                            })
                            // console.log('result::', result)
                            // console.log('findResult::',findResult)
                            expect(R.has('_id', result)).toBe(true)

                        })
                        test(`the result has the extendResult of db_model?`, async () => {

                            expect(R.has('extendedResult', pointerResult)).toBe(true)
                        })
                        test(`exec model.find to find the result on database`, async () => {
                            let findResult = await model.find({
                                selector: { _id: { $eq: pointerResult._id } }
                            })
                            expect(R.has('_id', findResult[0])).toBe(true)
                            expect(pointerResult._id).toBe(findResult[0]._id)
                        })


                    })


                }
            )(testingData)
    )(listInserts)
}

const testCrud = (db_models) => {
    const processData = require('../../index.test.data').get()
    // console.log('processData::',processData)
    describe('->CRUD', () => {
        if (R.hasPath(['db_models', 'insertOne'], processData)) {
            test_insertOne({
                listInserts: processData.db_models.insertOne,
                db_models
            })
            test_find({
                listFinds: processData.db_models.find,
                db_models
            })
        }
    })

}

const testOnlineDB = (db_models) => {
    describe('->are online db.info()?', () => {
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
        )(db_models)
    })

}

var db_models = null
module.exports = ({ db }) => {
    // console.log(db)
    describe('db_models', () => {

        test('Arguments', () => {
            expect(db).toEqual(
                expect.any(Object)
            )
        })
        const index = require('./index')({
            db
        })
        db_models = index
        test('result Object?', () => {
            expect(db_models).toEqual(
                expect.any(Object)
            )
        })
        test('has insertOne() been added?. Test in first element', () => {
            expect(
                R.pipe(
                    R.toPairs,
                    dbs => dbs[0][1],
                    R.toPairs,
                    shards => shards[0][1],
                )(db_models)
            ).toEqual(
                expect.objectContaining({
                    insertOne: expect.any(Function)
                    // _rev: expect.objectContaining({ isNodeType: true }),
                })
            )
        })

        testOnlineDB(db_models)
        if (conectTests.testOnlineDB === true) {
            testCrud(db_models)
        }
    })





    return db_models

}