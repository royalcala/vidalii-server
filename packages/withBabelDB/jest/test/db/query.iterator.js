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
                    onData: (data) => {
                        // console.log(tableName, '.query.iterator::', data)
                        arrayData.push(data)
                    }
                }, {
                    limit: 1,
                    keyAsBuffer: false,
                    valueAsBuffer: false
                })
                expect(arrayData.length).toEqual(1)
            }
        );
        var i = 1
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
                }, {
                    // limit: 1,
                    keyAsBuffer: false,
                    valueAsBuffer: false
                })
                // console.log('arrayData.length::',arrayData.length)
                expect(arrayData.length).toEqual(1)
            }
        );
    })
}