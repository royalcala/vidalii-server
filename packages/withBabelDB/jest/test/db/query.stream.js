export default () => {
    describe('.query.stream', () => {
        var db
        beforeAll(() => {
            db = global.db
        });
        // afterAll(async () => {
        //     // console.log('afterAll:')
        //     // var close1 = await db.docs.close()
        //     // var close2 = await db.rev.close()
        //     // var close3 = await db.seq.close()
        //     // console.log('close-3-3:', close1, close2, close3)
        // });

        test.each([
            ['docs'], ['rev'], ['seq']
        ])(
            "%p.query.stream",
            async (tableName) => {
                var expectResul = 0
                var response = await db[tableName].query.stream({
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
                        console.log(`${tableName}:`, data)
                        expectResul += 1
                    }
                })
                expect(expectResul).toEqual(1)
            }
        );
    })
}