import { int, string } from '../src/leafTypes'
export default () => {
    describe('structureSchema', () => {
        let schemadb
        beforeAll(async () => {
            // schemadb = global.schemadb
            schemadb = global.schemadb({
                a: int()
            })
        });
        test('has', () => {
            expect(schemadb.schema()).toEqual(
                expect.objectContaining({
                    a: expect.objectContaining({
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