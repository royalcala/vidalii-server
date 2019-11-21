
export default () => {
    var firstDoc = {
        key: { _id: 'myFirstTest' },
        value: { data1: '1', data2: 2 }
    }
    //The next is  updated in the inserted with {_id,_rev,_rev_id}
    var firstDocWithRev


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
            var response = await model.rev.insertOne({
                ...firstDoc.key,
                ...firstDoc.value
            })
            firstDocWithRev = response.key
            expect(response.error).toEqual(null)
            var responseGet = await db.rev.tac.get(response.key)
            expect(responseGet.data).toEqual(firstDoc.value)
        })

        test('.lastDocRev', async () => {
            var response = await model.rev.lastDocRev(firstDoc.key)
            expect(response.error).toEqual(null)
            expect(response.data._id).toEqual(firstDoc.key._id)
        })
        test('.existDoc', async () => {
            var response = await model.rev.lastDocRev({_id:'no_existe'})            
            expect(response.error).toEqual(null)
            expect(response.data).toEqual(null)
        })
        test('.insertNextDocRev', async () => {
            var response = await model.rev.insertNextDocRev({
                _id: firstDoc.key._id
            })
            // console.log('response::', response)
            // expect(response.error).toEqual(null)
        })

    })
}