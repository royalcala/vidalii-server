const R = require('ramda')
var index = null
module.exports = ({ db_models }) => {
    describe('transactions', () => {
        test('Are not empty all the arguments?', () => {
            expect(
                R.isEmpty(db_models)
            ).toEqual(false)
        })
    })
    return index
}