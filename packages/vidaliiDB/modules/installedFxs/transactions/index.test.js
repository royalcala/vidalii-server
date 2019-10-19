const R = require('ramda')

var index = null
module.exports = ({ db_models_shards }) => {
    describe('transactions', () => {
        test('Arguments?', () => {
            expect(
                R.isEmpty(db_models_shards)
            ).toEqual(false)
        })
        index = require('./index')({ db_models_shards })
        // console.log('schema_types::', schema_types)

        // test('is not Empty?', () => {
        //     expect(
        //         R.isEmpty(index)
        //     ).toEqual(false)
        // })

    })

    return index
}