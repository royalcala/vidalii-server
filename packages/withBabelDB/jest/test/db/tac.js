import { equals } from 'ramda'
const checkFirstValue = async ({ db }) => {
    var expectResul
    await db.query.stream({
        query: {
            keys: true,
            values: true,
            //   gt: config.uuid,
            //   lt: config.uuid + '\xff',
            limit: 1,
            //   reverse: true
        },
        decoderOuts: {
            key: true,
            value: true
        },
        onData: data => {
            // console.log(`db.${tableName}:`, data)
            expectResul = data
        }
    })
    return expectResul
}
export default () => {
    describe('.tac', () => {
        var db
        beforeAll(() => {
            db = global.db
            // tableKeys = Object.keys(db).map(
            //     (tableName) => [tableName]
            // )
            // console.log(tableKeys)

        });
        // afterAll(async () => {
        //     // console.log('afterAll:')
        //     // var close1 = await db.docs.close()
        //     // var close2 = await db.rev.close()
        //     // var close3 = await db.seq.close()
        //     // console.log('close-3-3:', close1, close2, close3)
        // });

        test('docs.tac.put&&get&&query.stream', async () => {
            var data = {
                key: '1',
                value: { myValueString: 'string' },
            }
            var response = await db.docs.tac.put(data.key, data.value)
            // console.log('response1::', response)
            expect(response.error).toEqual(null)
            // var buf = Buffer.from(data.key);
            var response2 = await db.docs.tac.get(data.key)
            // console.log('response2:', response2)
            expect(response2.error).toEqual(null)
            expect(response2.data).toEqual(data.value)
            var resultStream = await checkFirstValue({ db: db.docs })
            expect(data).toEqual(resultStream)
        })
        test('rev.tac.put&&get&&query.stream', async () => {
            var data = {
                key: { _id: "1", _rev: 1 },
                value: { string: 'hola' }
            }
            var response = await db.rev.tac.put(data.key, data.value)
            expect(response.error).toEqual(null)
            expect(Object.keys(response.key)).toEqual(expect.arrayContaining(
                ['_id', '_rev', '_rev_id']
            ));
            var response2 = await db.rev.tac.get(response.key)
            expect(response2.error).toEqual(null)
            expect(response2.data).toEqual(data.value)
            var resultStream = await checkFirstValue({ db: db.rev })            
            expect({ key: response.key, value: data.value }).toEqual(resultStream)
        })

        test('seq.tac.put&&get&&query.stream', async () => {
            var data = {
                key: { _seq: 99999999 },
                value: { string: 'hola' }
            }
            var response = await db.seq.tac.put(data.key, data.value)
            expect(response.error).toEqual(null)

            var response2 = await db.seq.tac.get(data.key)
            expect(response2.error).toEqual(null)
            expect(response2.data).toEqual(data.value)

            var resultStream = await checkFirstValue({ db: db.seq })
            expect(data.key._seq).toEqual(resultStream.key._seq)
            expect(data.value).toEqual(resultStream.value)
        })

        // test.each([
        //     ['docs'], ['rev'], ['seq']
        // ])(
        //     "%p.put&&get",
        //     async (tableName) => {
        //         // var data = {
        //         //     key: Buffer.from('key'),
        //         //     value: Buffer.from('value'),
        //         //     // options:{}
        //         // }
        //         var data = {
        //             key: {
        //                 docs: '1',
        //                 rev: { _id: '1', _rev: 1 },
        //                 seq: { _seq: 1 }
        //             },
        //             value: { myValueString: 'string' },
        //             // options:{}
        //         }
        //         var db = db[tableName]
        //         // var toEqual = equals(tableName)
        //         // var typeEncoderKey = toEqual('docs') ? key.docs : toEqual('rev') ? key.rev : key.seq
        //         var response = await db.tac.put(data.key, data.value)
        //         // console.log('response1::', response)
        //         expect(response.error).toEqual(null)
        //         // var buf = Buffer.from(data.key);
        //         var response2 = await db.tac.get(data.key)
        //         // console.log('response2:', response2)
        //         expect(response2.error).toEqual(null)
        //         expect(response2.data.value).toEqual(data.value)
        //     }
        // );
    })

}