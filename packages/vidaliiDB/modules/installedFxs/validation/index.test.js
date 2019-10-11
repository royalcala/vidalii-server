const validationFxs = require('./readInstalled')(__dirname + '/installedFxs')

module.exports = () => {
    const index = require('./index')()

    test('validation', async () => {
        expect(
            Object.keys(index)
        ).toEqual(
            expect.arrayContaining(
                Object.keys(validationFxs)
            )
        )
    })

    return index

}