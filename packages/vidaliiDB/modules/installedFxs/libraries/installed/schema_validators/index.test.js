const validationFxs = require('./readInstalled')(__dirname + '/installedFxs')


module.exports = () => {

    describe("validation", () => {
        test('.readinstalledFxs', () => {
            const index = require('./index')()
            expect(
                Object.keys(index)
            ).toEqual(
                expect.arrayContaining(
                    Object.keys(validationFxs)
                )
            )
        })

        require('./installedFxs/validateDoc/index.test')()

    })




    return require('./index')()

}