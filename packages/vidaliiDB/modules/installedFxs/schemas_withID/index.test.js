// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"
const R = require('ramda')
var index = null
module.exports = ({ schemas, libraries }) => {

    describe('schemas_withID', () => {
        test('Arguments', () => {
            expect(schemas).toEqual(
                expect.any(Object)
            )
            expect(libraries).toEqual(
                expect.any(Object)
            )
        })
        const schemas_withID = require('./index')({
            schemas, libraries
        })
        index = schemas_withID

        test('Result', () => {
            expect(index).toEqual(
                expect.any(Object)
            );
        })

        test('schemas has More than 0 objects', () => {
            expect(Object.keys(index).length > 0).toEqual(true);
        })
        // console.log(Object.entries(index)[0][1])

        test('Has added an _id and _rev fields. Test in first Object', () => {
            expect(
                R.pipe(
                    R.toPairs,
                    x => x[0],
                    ([n, v]) => v
                )(index)
            ).toEqual(
                expect.objectContaining({
                    _id: expect.objectContaining({ isNodeType: true }),
                    _rev: expect.objectContaining({ isNodeType: true }),
                })
            )
        })
        // test('Has an _id field', () => {
        //     expect(index).toEqual(expect.objectContaining({
        //         _id: expect.any(Function)
        //     }));
        // })
    })
    // const index = require('./index')({
    //     schemas
    // })
    // return index
    return index
}