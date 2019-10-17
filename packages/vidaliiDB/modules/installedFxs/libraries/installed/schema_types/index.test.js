const R = require('ramda')

describe('-schema_types', () => {
    test('Are all functions?', () => {
        const schema_types = require('./index')
        expect(
            R.all(
                ([n, v]) => R.equals('Function', R.type(v))
            )(
                R.toPairs(schema_types)
            )
        ).toEqual(true)
    })

})