export default () => {
    describe('.seq', () => {
        var db, model, config
        beforeAll(async () => {
            db = await global.db
            model = await global.model
            config = global.config
        });
        test('has:insertOne,store.counter?', async () => {
            expect(Object.keys(model.seq)).toEqual(expect.arrayContaining(
                ['insertNextSeq', 'store']
            ));
        })
        test('.insertNextSeq&&store.counter', async () => {
            var data = {
                value: { myData: '****data****' }
            }
            var response = await model.seq.insertNextSeq(data.value)
            expect(response.error).toEqual(null)
            expect(response._seq).toEqual(1)
            var responseGet = await db.seq.tac.get({ _seq: response._seq })
            expect(responseGet.data).toEqual(data.value)
            var response2 = await model.seq.insertNextSeq(data.value)
            expect(response2.error).toEqual(null)
            expect(response2._seq).toEqual(2)
            // var streamAll = await db.seq.query.stream({
            //     onData: (d) => {
            //         console.log(d)
            //     },
            //     decoderOuts: {
            //         keys: true,
            //         values: false
            //     }
            // })

            // var responseGet = await db.seq.tac.get('591bb671-15a8-4bb8-84ef-5904271745a8!fc2615', { encoder: false })
            // console.log('responseGet111::', responseGet)
        })


    })

}