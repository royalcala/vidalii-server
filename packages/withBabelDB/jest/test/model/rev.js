
export default () => {
    describe('.rev', () => {
        var db, model
        beforeAll(async () => {
            db = await global.db
            model = await global.model

        });
        test('has:insertOne,insertNextDocRev?', async () => {
            expect(Object.keys(model.rev)).toEqual(expect.arrayContaining(
                ['insertOne', 'insertNextDocRev']
            ));
        })
        test('.insertOne withoutID', async () => {
            var data = { my_data: 'holis' }
            var response = await model.rev.insertOne(data)
            expect(response.error).toEqual(null)
            var responseGet = await db.rev.tac.get(response.key)
            expect(responseGet.data).toEqual(data)
        })
        test('.insertOne withID', async () => {
            var myData = { data1: '1', data2: 2 }
            var data = { _id: 'holis', ...myData }
            var response = await model.rev.insertOne(data)
            expect(response.error).toEqual(null)
            var responseGet = await db.rev.tac.get(response.key)
            expect(responseGet.data).toEqual(myData)
        })

    })
}