// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"

module.export = ({ pathToInputs }) => {
    const index = require('./index')({
        pathToInputs
    })
    test('input', async () => {
        expect(index).toEqual(
            expect.any(Object)
        );
    })
    return index
}