// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"

module.export = ({ databases }) => {
    const index = require('./index')({
        input
    })
    test('databases_models', async () => {
        expect(index).toEqual(
            expect.any(Object)
        );
    })
    return index

}