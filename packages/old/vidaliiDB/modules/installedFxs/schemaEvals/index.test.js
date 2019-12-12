// const validationFxs = require('./readInstalled')(__dirname + '/installedFxs')
const R = require('ramda')
var index = null
module.exports = () => {
    describe("schemaEvals", () => {
        index = require('./index')
        test('->is not Empty?', () => {
            expect(
                R.isEmpty(index)
            ).toEqual(false)
        })
        require('./installed/updateDoc/index.test.js')


    })
    return index
}