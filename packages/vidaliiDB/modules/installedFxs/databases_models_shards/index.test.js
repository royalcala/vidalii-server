// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"

module.exports = ({ databases, databases_models }) => {
    const index = require('./index')({
        databases, databases_models
    })
    test('databases_models_shards', async () => {
        expect(index).toEqual(
            expect.any(Object)
        );
    })
    return index

}