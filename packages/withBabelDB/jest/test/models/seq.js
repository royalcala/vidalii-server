export default () => {
    describe('.seq', () => {
        var seq
        beforeAll(async () => {
            seq = await global.models.seq
            // tableKeys = Object.keys(table).map(
            //     (tableName) => [tableName]
            // )
            // console.log(tableKeys)

        });
        test('has:insertOne?', async () => {
            expect(Object.keys(seq)).toEqual(expect.arrayContaining(
                ['insertOne']
            ));
        })
        // test.each([
        //     ['docs'], ['rev'], ['seq']
        // ])(
        //     "%p",
        //     async (tableName) => {
        //         console.log('tableName:', tableName)
        //         var response = await table[tableName].tac.put('1', { first: 1 })
        //         expect(response.error).toEqual(null)
        //     }
        // );
        test('.insertOne', async () => {
            var response = await seq.insertOne()
            expect(response.error).toEqual(null)
        })

    })

}