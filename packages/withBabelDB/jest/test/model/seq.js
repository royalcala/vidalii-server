export default () => {
    describe('.seq', () => {
        var db, model, config
        beforeAll(async () => {
            db = await global.db
            model = await global.model
            config = global.config
        });
        // test('has:insertNextSeq,store?', async () => {
        //     expect(Object.keys(model.seq)).toEqual(expect.arrayContaining(
        //         ['insertNextSeq', 'store']
        //     ));
        // })
        // test('has:store.counter:nextSeq,getActualSeq,restoreSeq?', async () => {
        //     expect(Object.keys(model.seq.store.counter)).toEqual(expect.arrayContaining(
        //         ['nextSeq', 'getActualSeq','restoreSeq']
        //     ));
        // })
        test('store.counter:restoreSeq, works?', async () => {
            //in test of tac was inserted manually one doc in _seq=1
            let actualSeq = await model.seq.store.counter.getActualSeq()
            expect(actualSeq).toEqual(0)//because was written one in manual mode 
            console.time('query.iterator')
            // query.iterator: 0ms
            let restoreSeq = await model.seq.store.counter.restoreSeq()
            console.timeEnd('query.iterator')
            expect(restoreSeq).toEqual(1)

            console.time('query.stream')
            // query.stream: 3ms
            let restoreSeq2 = await model.seq.store.counter.restoreSeq2()
            console.timeEnd('query.stream')
            expect(restoreSeq2).toEqual(1)

        })
        // test('.insertNextSeq&&store.counter', async () => {


        //     var data = {
        //         value: { myData: '****data****' }
        //     }
        //     var response = await model.seq.insertNextSeq(data.value)
        //     console.log('response insert Next::', response)
        //     expect(response.error).toEqual(null)
        //     // expect(response._seq).toEqual(1)
        //     // var responseGet = await db.seq.tac.get({ _seq: response._seq })
        //     // expect(responseGet.data).toEqual(data.value)
        //     // var response2 = await model.seq.insertNextSeq(data.value)
        //     // expect(response2.error).toEqual(null)
        //     // expect(response2._seq).toEqual(2)
        //     // var streamAll = await db.seq.query.stream({
        //     //     onData: (d) => {
        //     //         console.log(d)
        //     //     },
        //     //     decoderOuts: {
        //     //         keys: true,
        //     //         values: false
        //     //     }
        //     // })

        //     // var responseGet = await db.seq.tac.get('591bb671-15a8-4bb8-84ef-5904271745a8!fc2615', { encoder: false })
        //     // console.log('responseGet111::', responseGet)
        // })


    })

}