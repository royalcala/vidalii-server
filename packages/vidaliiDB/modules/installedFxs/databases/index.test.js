// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"

module.exports = ({ input }) => {
    const index = require('./index')({
        input
    })
    test('databases', async () => {
        expect(index).toEqual(
            expect.any(Object)
        );
    })
    return index

}