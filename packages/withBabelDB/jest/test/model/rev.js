
export default () => {
    describe('.rev', () => {
        var db, model
        beforeAll(async () => {
            db = await global.db
            model = await global.model

        });
        test('has:insertOne?', async () => {
            expect(Object.keys(model.rev)).toEqual(expect.arrayContaining(
                ['insertOne']
            ));
        })
        test('.insertOne withoutID', async () => {
            var data = { my_data: 'holis' }
            var response = await model.rev.insertOne(data)
            expect(response.error).toEqual(null)
            var responseGet = await db.rev.tac.get({
                _id: response._id,
                _rev: 1
            })
            expect(responseGet.data).toEqual(data)
            // console.log(responseGet)
        })
        test('.insertOne witID', async () => {
            var data = { _id: 'holis', my_data: 'holis' }
            var response = await model.rev.insertOne(data)
            expect(response.error).toEqual(null)
            // var responseGet = await db.rev.tac.get({
            //     _id: data._id,
            //     _rev: 1
            // })
            // expect(responseGet.data).toEqual(data)
            // console.log(responseGet)
        })

    })
}