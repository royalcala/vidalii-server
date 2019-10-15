// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"
const R = require('ramda')
const recursiveSearch = schema => {
    var has_isNodeType = false
    var recursive = schema => R.pipe(
        R.toPairs,
        R.reduce(
            (acc, [nameNextObj, valueNextObj]) => {
                // console.log(nameNextObj)
                if (nameNextObj === 'isNodeType') {
                    has_isNodeType = true
                    return 'fin'
                }
                return {
                    ...acc,
                    [nameNextObj]: R.cond([
                        [R.is(Function), () => valueNextObj],
                        [R.is(Array), () => {
                            return [
                                recursive(valueNextObj[0])
                            ]
                        }],
                        [R.is(Object), () => {

                            return recursive(valueNextObj)
                        }]
                    ])(valueNextObj)
                }
            },
            {})
    )(schema)
    recursive(schema)

    return has_isNodeType
}
var index = null
module.exports = ({ input, libraries }) => {

    describe('schemas', () => {
        test('Arguments', () => {
            expect(input).toEqual(
                expect.any(Object)
            )
            expect(libraries).toEqual(
                expect.any(Object)
            )
        })
        const schemas = require('./index')({
            input, libraries
        })
        index = schemas
        test('Result', () => {
            expect(index).toEqual(expect.any(Object))
        })
        test('More than Cero Object', () => {
            expect(Object.keys(index).length > 0).toEqual(true)
        })
        test('Has isNodeType. test in first object', () => {
            // console.log(Object.entries(schemas)[0][1])
            expect(
                recursiveSearch(
                    Object.entries(schemas)[0][1]
                )
            ).toEqual(true)
        })
    })

    return index

}