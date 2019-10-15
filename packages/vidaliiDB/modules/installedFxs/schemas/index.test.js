// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"
var index = null
module.exports = ({ input, libraries }) => {


    describe('schemas', () => {
        test('Arguments', async () => {
            expect(input).toEqual(
                expect.any(Object)
            )
            expect(libraries).toEqual(
                expect.any(Object)
            )
        })
        const schemas = require('./index')({
            input, libraries
        })
        index = schemas
        test('Result', async () => {
            expect(index).toEqual(expect.any(Object))
        })
        test('More than Cero Object', async () => {
            expect(Object.keys(index).length > 0).toEqual(true)
        })
    })

    return index

}