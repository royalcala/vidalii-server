const R = require('ramda')
var index = null

module.exports = () => {

    describe('libraries', () => {

        test('schema_types. all are functions?', () => {
            const schema_types = require('./installed/schema_types')
            expect(
                R.all(
                    ([n, v]) => R.equals('Function', R.type(v))
                )(
                    R.toPairs(schema_types)
                )
            ).toEqual(true)
        })

        const libraries = require('./index')()
        index = libraries
        test('types and validators exist in libraries and are objects', () => {
            // expect(index).toEqual(expect.any(Object))
            expect(index).toEqual(expect.objectContaining({
                // schema_fxs_types: expect.any(Object),
                schema_types: expect.objectContaining({ string: expect.any(Object) }),
                schema_validators: expect.objectContaining({ updateDoc: expect.any(Function) }),
            }))
            // console.log(index)
        })


    })
    // console.log('index::',index)

    return index
}