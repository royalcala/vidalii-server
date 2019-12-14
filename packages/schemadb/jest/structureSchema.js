export default () => {
    describe('structureSchema', () => {
        let schemadb
        beforeAll(async () => {
            schemadb = global.schemadb
        });
        test('has', () => {
            expect(schemadb.schema()).toEqual(
                expect.objectContaining({
                    testStructure: expect.objectContaining({
                        vidaliiLeaf: true,
                        type: expect.any(String),
                        insert: expect.any(Function),
                        update: expect.any(Function)
                    })
                })
            )
        })
    })

}