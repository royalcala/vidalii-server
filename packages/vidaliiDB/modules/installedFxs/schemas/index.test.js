// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"

module.exports = ({ input }) => {
    test('schemas arguments', async () => {
        expect(input).toEqual(
            expect.any(Object)
        )
    })
    const index = require('./index')({
        input
    })
    test('schemas result', async () => {
        expect(index).toEqual(
            expect.any(Object)
        );
    })
    return index

}