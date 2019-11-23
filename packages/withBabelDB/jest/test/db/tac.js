import { equals } from 'ramda'
var uuid = require('uuid/v4')
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
        var db, config
        beforeAll(() => {
            db = global.db
            config = global.config
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

        test('docs.tac.put&&get', async () => {
            const myDB = db.docs
            // const { keyEncoding, valueEncoding } = myDB.encoder

            var data = {
                key: '1',
                value: { myValueString: 'string' },
            }
            // var encodedData = {
            //     key: keyEncoding.encode(data.key),
            //     value: valueEncoding.encode(data.value)
            // }
            // var response = await myDB.tac.put(encodedData.key, encodedData.value)
            var response = await myDB.tac.put(data.key, data.value)
            // console.log('response1::', response)
            expect(response.error).toEqual(null)
            // var buf = Buffer.from(data.key);
            var response2 = await myDB.tac.get(data.key)
            // console.log('response2:', response2)
            expect(response2.error).toEqual(null)
            expect(response2.data).toEqual(data.value)
            // var resultStream = await checkFirstValue({ db: myDB })
            // expect(data).toEqual(resultStream)
        })
        test('rev.tac.put&&get', async () => {
            const myDB = db.rev
            // const { keyEncoding, valueEncoding } = myDB.encoder
            var data = {
                key: { _id: "1", _rev: 1, _rev_id: uuid() },
                value: { string: 'hola' }
            }
            // var encodedData = {
            //     key: keyEncoding.encode(data.key),
            //     value: valueEncoding.encode(data.value)
            // }
            var response = await myDB.tac.put(data.key, data.value)
            // console.log('response1::', response)
            expect(response.error).toEqual(null)
            // var buf = Buffer.from(data.key);
            var response2 = await myDB.tac.get(data.key)
            // console.log('response2:', response2)
            expect(response2.error).toEqual(null)
            expect(response2.data).toEqual(data.value)
            // var resultStream = await checkFirstValue({ db: myDB })
            // expect(data).toEqual(resultStream)
        })
        test('seq.tac.put&&get', async () => {
            const myDB = db.seq
            // const { keyEncoding, valueEncoding } = myDB.encoder
            var data = {
                key: {
                    _id_table: config._id_table,
                    _seq: 1
                },
                value: { string: 'hola' }
            }
            // var encodedData = {
            //     key: keyEncoding.encode(data.key),
            //     value: valueEncoding.encode(data.value)
            // }
            var response = await myDB.tac.put(data.key, data.value)
            // console.log('response1::', response)
            expect(response.error).toEqual(null)
            // var buf = Buffer.from(data.key);
            var response2 = await myDB.tac.get(data.key)
            // console.log('response2:', response2)
            expect(response2.error).toEqual(null)
            expect(response2.data).toEqual(data.value)
            // var resultStream = await checkFirstValue({ db: myDB })
            // expect(data).toEqual(resultStream)
        })
        // test('rev.tac.put&&get&&query.stream', async () => {
        //     var data = {
        //         key: { _id: "1", _rev: 1, _rev_id: uuid() },
        //         value: { string: 'hola' }
        //     }
        //     var response = await db.rev.tac.put(data.key, data.value)
        //     expect(response.error).toEqual(null)
        //     expect(Object.keys(response.key)).toEqual(expect.arrayContaining(
        //         ['_id', '_rev', '_rev_id']
        //     ));
        //     var response2 = await db.rev.tac.get(response.key)
        //     expect(response2.error).toEqual(null)
        //     expect(response2.data).toEqual(data.value)
        //     var resultStream = await checkFirstValue({ db: db.rev })
        //     expect({ key: response.key, value: data.value }).toEqual(resultStream)
        // })

        // test('seq.tac.put&&get&&query.stream', async () => {
        //     var data = {
        //         key: {
        //             _id_table: config._id_table,
        //             _seq: 1
        //         },
        //         value: { string: 'hola' }
        //     }
        //     var response = await db.seq.tac.put(data.key, data.value)
        //     console.log('response::', response)
        //     expect(response.error).toEqual(null)

        //     var response2 = await db.seq.tac.get(data.key)
        //     expect(response2.error).toEqual(null)
        //     expect(response2.data).toEqual(data.value)

        //     var resultStream = await checkFirstValue({ db: db.seq })
        //     expect(data.key._seq).toEqual(resultStream.key._seq)
        //     expect(data.value).toEqual(resultStream.value)
        // })


    })

}