
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
        test('has:insertNewDoc,getLastDocRev?', async () => {
            expect(Object.keys(model.rev)).toEqual(expect.arrayContaining(
                ['insertNewDoc', 'getLastDocRev']
            ));
        })
        test('.existDoc:false', async () => {
            var response = await model.rev.getLastDocRev('no_existe')
            expect(response.error).toEqual(null)
            expect(response.data).toEqual(null)
        })
        test('.insertNewDoc withoutID', async () => {
            var data = { my_data: 'holis' }
            var response = await model.rev.insertNewDoc(data)
            expect(response.error).toEqual(null)
            var responseGet = await db.rev.tac.get(response.key)
            expect(responseGet.data).toEqual(data)
        })
        test('.insertNewDoc withID', async () => {
            var response = await model.rev.insertNewDoc({
                ...firstDoc.key,
                ...firstDoc.value
            })
            // console.log('responsewithID::', response)
            firstDocWithRev = response.key
            expect(response.error).toEqual(null)
            var responseGet = await db.rev.tac.get(response.key)
            expect(responseGet.data).toEqual(firstDoc.value)
        })

        test('.getLastDocRev', async () => {
            var response = await model.rev.getLastDocRev(firstDoc.key._id)
            // console.log('response_getLastDocRev::', response)
            expect(response.error).toEqual(null)
            expect(response.data.key._id).toEqual(firstDoc.key._id)
        })

        // test('.insertNextDocRev', async () => {
        //     var response = await model.rev.insertNextDocRev({
        //         _id: firstDoc.key._id
        //     })
        //     // console.log('response::', response)
        //     // expect(response.error).toEqual(null)
        // })

    })
}