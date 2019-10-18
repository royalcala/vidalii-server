const R = require('ramda')
var index = null

module.exports = () => {

    describe('libraries', () => {

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
        require('./installed/schema_types/index.test')

        require('./installed/schema_validators/index.test')
    })
    // console.log('index::',index)

    return index
}