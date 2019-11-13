//with encode



export default () => {
    describe('.tace', () => {
        var table
        beforeAll(() => {
            table = global.table
            // tableKeys = Object.keys(table).map(
            //     (tableName) => [tableName]
            // )
            // console.log(tableKeys)

        });
        // test.each([
        //     ['docs'], ['rev'], ['seq']
        // ])(
        //     "%p.put&&get",
        //     async (tableName) => {
        //         var data = {
        //             key: Buffer.from('key'),
        //             value: Buffer.from('value'),
        //         }
        //         var db = table[tableName]
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
        test('docs.tace.put&&get', async () => {
            var data = {
                key: '1',
                value: { string: 'hola' }
            }
            var response = await table.docs.tace.put(data.key, data.value)
            expect(response.error).toEqual(null)
            // console.log('response:', response)
            var response2 = await table.docs.tace.get(data.key)
            // console.log('response2:', response2)
            expect(response2.error).toEqual(null)
            expect(response2.data.value).toEqual(data.value)
        })

        test('rev.tace.put&&get', async () => {
            var data = {
                key: {_id:1,_rev:1},
                value: { string: 'hola' }
            }
            var response = await table.rev.tace.put(data.key, data.value)
            expect(response.error).toEqual(null)
            console.log('response:', response)
            var response2 = await table.rev.tace.get(data.key)
            console.log('response2:', response2)
            expect(response2.error).toEqual(null)
            expect(response2.data.value).toEqual(data.value)
        })

        test('seq.tace.put&&get', async () => {
            var data = {
                key: { _seq: 1 },
                value: { string: 'hola' }
            }
            var response = await table.seq.tace.put(data.key, data.value)
            expect(response.error).toEqual(null)
            var response2 = await table.seq.tace.get(data.key)
            // console.log('response2:', response2)
            expect(response2.error).toEqual(null)
            expect(response2.data.value).toEqual(data.value)
        })
    })

}