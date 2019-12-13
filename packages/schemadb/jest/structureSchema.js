export default () => {
    describe('structureSchema', () => {
        let schemadb
        beforeAll(async () => {
            schemadb = global.schemadb
        });
        test('first', () => {
            console.log('schemadb::',schemadb.schema())
            expect(true).toBe(true)
        })
    })

}