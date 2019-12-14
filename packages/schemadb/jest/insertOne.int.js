export default () => {
    describe('insertOne.int', () => {
        let schemadb
        beforeAll(async () => {
            schemadb = global.schemadb
            console.log('schemadb::', schemadb.schema())
        });
        test('43px=3', async () => {
            let response
            response = await schemadb.insertOne({ _id: 1 }, { testInsertOne: '43px' })
            expect(response.schemadb.value.testInsertOne).toBe(43)
        })
        test('string=0', async () => {
            let response
            response = await schemadb.insertOne({ _id: 1 }, { testInsertOne: 'holispx' })
            expect(response.schemadb.value.testInsertOne).toBe(0)
        })
        test('negative', async () => {
            let response
            response = await schemadb.insertOne({ _id: 1 }, { testInsertOne: -1 })
            expect(response.schemadb.value.testInsertOne).toBe(-1)
        })
        test('float', async () => {
            let response
            response = await schemadb.insertOne({ _id: 1 }, { testInsertOne: 2.99 })
            expect(response.schemadb.value.testInsertOne).toBe(2)
        })
        test('doesnt has properties undefined', async () => {
            let response
            response = await schemadb.insertOne({ _id: 1 }, { testInsertOne: 2.99, notToSave: 10 })
            expect(response.schemadb.value).toEqual(
                expect.objectContaining({
                    testInsertOne: 2
                })
            )
            // expect(response.schemadb.value.hasOwnProperty('testInsertOne')).toEqual(true)
            expect(response.schemadb.value.hasOwnProperty('notToSave')).toEqual(false)
        })
        test('nested', async () => {
            let response
            response = await schemadb.insertOne({ _id: 1 }, {
                testInsertOne: 2.99,
                notToSave: 10,
                testInsertOneNested: {
                    a: 2.3
                }
            })
            expect(response.schemadb.value).toEqual(
                expect.objectContaining({
                    testInsertOne: 2,
                    testInsertOneNested: {
                        a: 2
                    }
                })
            )
            expect(response.schemadb.value.hasOwnProperty('notToSave')).toEqual(false)
        })
    })

}