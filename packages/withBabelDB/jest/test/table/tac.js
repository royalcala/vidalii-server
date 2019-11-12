


export default () => {
    describe('.tac', () => {
        var table, tableKeys
        beforeAll(() => {
            table = global.table
            // tableKeys = Object.keys(table).map(
            //     (tableName) => [tableName]
            // )
            // console.log(tableKeys)

        });
        // afterAll(async () => {
        //     // console.log('afterAll:')
        //     // var close1 = await table.docs.close()
        //     // var close2 = await table.rev.close()
        //     // var close3 = await table.seq.close()
        //     // console.log('close-3-3:', close1, close2, close3)
        // });
        test.each([
            ['docs'], ['rev'], ['seq']
        ])(
            "%p.put&&get",
            async (tableName) => {
                var data = {
                    key: Buffer.from('key'),
                    value: Buffer.from('value'),
                }
                var db = table[tableName]
                var response = await db.tac.put(data.key, data.value)
                // console.log('response1::', response)
                expect(response.error).toEqual(null)
                // var buf = Buffer.from(data.key);
                var response2 = await db.tac.get(data.key)
                // console.log('response2:', response2)
                expect(response2.error).toEqual(null)
                expect(response2.data.value).toEqual(data.value)
            }
        );
        // test('docs.tac.put&&get', async () => {
        //     // var data = {
        //     //     key: '1',
        //     //     value: { string: 'hola' }
        //     // }
        //     var data = {
        //         key: Buffer.from('key'),
        //         value: Buffer.from('value'),
        //     }
        //     var response = await table.docs.tac.put(data.key, data.value)
        //     console.log('response1::', response)
        //     expect(response.error).toEqual(null)
        //     // var buf = Buffer.from(data.key);
        //     var response2 = await table.docs.tac.get(data.key)
        //     // console.log('response2:', response2)
        //     expect(response2.error).toEqual(null)
        //     expect(response2.data.value).toEqual(data.value)
        // })
        // test('rev.tac.put&&get', async () => {
        //     // var data = {
        //     //     key: { _id: 1, _rev: 1 },
        //     //     value: { string: 'hola' }
        //     // }
        //     var data = {
        //         key: 1,
        //         value:1
        //     }
        //     var response = await table.rev.tac.put(data.key, data.value)
        //     expect(response.error).toEqual(null)
        //     var response2 = await table.rev.tac.get(data.key)
        //     expect(response2.error).toEqual(null)
        //     expect(response2.data.value).toEqual(data.value)
        // })

        // test('seq.tac.put&&get', async () => {
        //     var data = {
        //         key: { _seq: 1 },
        //         value: { string: 'hola' }
        //     }
        //     var response = await table.seq.tac.put(data.key, data.value)
        //     expect(response.error).toEqual(null)
        //     var response2 = await table.seq.tac.get(data.key)
        //     expect(response2.error).toEqual(null)
        //     expect(response2.data.value).toEqual(data.value)
        // })
    })

}