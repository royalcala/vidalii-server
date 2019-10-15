var index = null

module.exports = () => {

    describe('libraries', () => {
        const libraries = require('./index')()
        index = libraries
        test('read installed', () => {
            // expect(index).toEqual(expect.any(Object))
            expect(index).toEqual(expect.objectContaining({
                // schema_fxs_types: expect.any(Object),
                schema_fxs_types: expect.objectContaining({ string: expect.any(Object) }),
                schema_validators: expect.objectContaining({ updateDoc: expect.any(Function) }),
            }))
            // console.log(index)
        })
    })
    // console.log('index::',index)

    return index
}