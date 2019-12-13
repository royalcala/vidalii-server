export default () => {
    describe('insertOne', () => {
        let schemadb
        beforeAll(async () => {
            schemadb = global.schemadb
            console.log('schemadb::', schemadb.schema())
        });
        test('first', async () => {
            let response = await schemadb.insertOne(1,{a:'43px'})
            console.log('response::',response)
            expect(true).toBe(true)
        })
    })

}