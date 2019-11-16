export default () => {
    describe('.seq', () => {
        var model
        beforeAll(async () => {
            model = await global.model
            // tableKeys = Object.keys(table).map(
            //     (tableName) => [tableName]
            // )
            // console.log(tableKeys)

        });
        test('has:insertOne,store.counter?', async () => {
            expect(Object.keys(model.seq)).toEqual(expect.arrayContaining(
                ['insertOne', 'store']
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
            var response = await model.seq.insertOne()
            expect(response.error).toEqual(null)
        })

    })

}