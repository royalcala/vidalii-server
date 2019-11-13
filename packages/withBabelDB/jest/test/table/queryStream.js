export default () => {
    describe('.queryStream', () => {
        var table, tableKeys
        beforeAll(() => {
            table = global.table
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
            "%p.queryStream",
            async (tableName) => {
                var db = table[tableName]
                var response = await db.queryStream({
                    withEncoder: true,
                    onData: (d) => {
                        console.log(d)
                    }
                })
                expect(true).toEqual(true)
            }
        );
    })
}