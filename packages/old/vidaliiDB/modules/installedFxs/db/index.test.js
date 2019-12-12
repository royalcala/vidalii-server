// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"
var index = null
module.exports = ({ input }) => {
    describe('db', () => {
        test('Arguments Object?', async () => {
            console.log('input:::', input)
            expect(input).toEqual(
                expect.any(Object)
            )
        })

        const db = require('./index')({
            input
        })
        index = db
        console.log('db::', db)
        test('result Object?', async () => {
            expect(index).toEqual(
                expect.any(Object)
            );
        })

    })

    return index

}