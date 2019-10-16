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
                    // console.log('db_models_shards::', db_models_shards)
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

    describe('->CRUD', () => {
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

var index = null
module.exports = ({ db, db_models }) => {
    describe('db_models_shards', () => {

        test('Arguments are Objects?', () => {
            expect(db).toEqual(
                expect.any(Object)
            )
            expect(db_models).toEqual(
                expect.any(Object)
            )
        })
        const db_models_shards = require('./index')(
            { db, db_models }
        )
        index = db_models_shards

        test('Result is a Object?', () => {
            expect(index).toEqual(
                expect.any(Object)
            )
        })
        test('has insertOne() been added?. test in first element', () => {
            expect(
                R.pipe(
                    R.toPairs,
                    dbs => dbs[0][1],
                    // R.toPairs,
                    // shards => shards[0][1],
                )(index)
            ).toEqual(
                expect.objectContaining({
                    insertOne: expect.any(Function)
                    // _rev: expect.objectContaining({ isNodeType: true }),
                })
            )
        })

        testCrud(db_models_shards)
    })

    return index

}