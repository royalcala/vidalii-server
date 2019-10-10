// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"

module.export = ({ databases, databases_models }) => {
    const index = require('./index')({
        input
    })
    test('databases_models_shards', async () => {
        expect(index).toEqual(
            expect.any(Object)
        );
    })
    return index

}