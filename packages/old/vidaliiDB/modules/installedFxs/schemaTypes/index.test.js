const R = require('ramda')

var index = null
module.exports = () => {
    describe('schemaTypes', () => {
        const types = require('./readInstalled')(__dirname + '/installed')
        test('Are all functions?', () => {
            expect(
                R.all(
                    ([n, v]) => R.equals('Function', R.type(v))
                )(
                    R.toPairs(types)
                )
            ).toEqual(true)
        })

        index = require('./index')()
        // console.log('schema_types::', schema_types)

        test('is not Empty?', () => {
            expect(
                R.isEmpty(index)
            ).toEqual(false)
        })

    })

    return index
}