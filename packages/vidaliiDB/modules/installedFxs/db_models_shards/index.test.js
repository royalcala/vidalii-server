const R = require('ramda')

const test_find = ({ listFinds, db_models_shards }) => {
    R.map(
        ({ databaseName, testingData }) =>
            R.map(
                ({ args: [arg1, arg2 = {}] }) => {
                    var model = db_models_shards[databaseName]
                    test(`${databaseName}.find`, async () => {
                        let findResult = await model.find(arg1, arg2)
                        expect(R.has('_id', findResult[0])).toBe(true)
                    })

                }
            )(testingData)
    )(listFinds)
}

const test_insertOne = ({ listInserts, db_models_shards }) => {
    R.map(
        ({ databaseName, testingData }) =>
            R.map(
                ({ args: [arg1, arg2 = {}] }) => {
                    var model = db_models_shards[databaseName]
                    // console.log('db_models_shards::',db_models_shards)
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

const testCrud = (db_models_shards) => {
    const processData = require('../../index.test.data').get()

    describe('db_models_shards CRUD', () => {
        if (R.hasPath(['db_models_shards', 'insertOne'], processData)) {
            test_insertOne({
                listInserts: processData.db_models_shards.insertOne,
                db_models_shards
            })
        }
        if (R.hasPath(['db_models_shards', 'find'], processData)) {
            test_find({
                listFinds: processData.db_models_shards.find,
                db_models_shards
            })
        }


    })
}

var db_models_shards = null
module.exports = ({ db, db_models }) => {
    test('db_models_shards Arguments', () => {
        expect(db).toEqual(
            expect.any(Object)
        )
        expect(db_models).toEqual(
            expect.any(Object)
        )
    })



    test('db_models result', () => {
        const index = require('./index')(
            { db, db_models }
        )
        db_models_shards = index
        
        expect(db_models_shards).toEqual(
            expect.any(Object)
        );
    })

    testCrud(db_models_shards)

    return db_models_shards

}