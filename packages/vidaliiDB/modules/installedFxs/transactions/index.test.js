const R = require('ramda')

var index = null
module.exports = ({ db_models }) => {
    describe('transactions', () => {
        test('Arguments?', () => {
            expect(
                R.isEmpty(db_models)
            ).toEqual(false)
        })
        index = require('./index')({ db_models })
        // console.log('schema_types::', schema_types)

        // test('is not Empty?', () => {
        //     expect(
        //         R.isEmpty(index)
        //     ).toEqual(false)
        // })

    })

    return index
}