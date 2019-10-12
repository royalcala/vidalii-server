// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"

module.exports = ({ input }) => {
    test('databases Arguments', async () => {
        expect(input).toEqual(
            expect.any(Object)
        )
    })
    const index = require('./index')({
        input
    })
    test('databases result', async () => {
        expect(index).toEqual(
            expect.any(Object)
        );
    })
    return index

}