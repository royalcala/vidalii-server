export default () => {
    describe('.query.iterator', () => {
        var db
        beforeAll(() => {
            db = global.db
        });

        test.each([
            ['docs'], ['rev'], ['seq']
        ])(
            "%p.query.iterator {limit:1}",
            async (tableName) => {
                var arrayData = []
                var response = await db[tableName].query.iterator({
                    // decoderOut: true,
                    onData: (data) => {
                        // console.log(tableName, '.query.iterator::', data)
                        arrayData.push(data)
                    },
                    limit: 1,
                })
                expect(arrayData.length).toEqual(1)
            }
        );
        var i
        test.each([
            ['docs'], ['rev'], ['seq']
        ])(
            "%p.query.iterator stop iterator",
            async (tableName) => {
                // await db[tableName].tac.put(i++,i++)
                // await db[tableName].tac.put(i++,i++)
                // await db[tableName].tac.put(i++,i++)
                var arrayData = []
                var response = await db[tableName].query.iterator({
                    onData: (data) => {
                        // console.log(tableName, '.query.iterator::', data)
                        arrayData.push(data)
                        return true
                    }
                })
                expect(arrayData.length).toEqual(1)
            }
        );
    })
}