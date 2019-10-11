// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"

module.exports = ({ pathToInputs }) => {
    const index = require('./index')({
        pathToInputs
    })
    test('input', async () => {
        expect(index).toEqual(
            expect.any(Object)
        );
        ///add expexted minimum (schema, shards)
    })
    return index
}