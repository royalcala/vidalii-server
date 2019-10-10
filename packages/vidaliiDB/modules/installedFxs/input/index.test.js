// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"

module.exports = ({ pathToInputs }) => {
    const index = require('./index')({
        pathToInputs
    })
    // console.log('index::', index)
    test('input', async () => {
        expect(index).toEqual(
            expect.any(Object)
        );
    })
    return index
}