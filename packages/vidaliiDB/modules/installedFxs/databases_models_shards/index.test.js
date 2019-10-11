// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"

module.exports = ({ databases, databases_models }) => {
    test('databases_models_shards arguments', async () => {
        expect(databases).toEqual(
            expect.any(Object)
        )
        expect(databases_models).toEqual(
            expect.any(Object)
        )
    })

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