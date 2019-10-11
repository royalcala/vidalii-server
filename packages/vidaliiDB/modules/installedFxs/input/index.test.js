// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"
const fs = require('fs')
module.exports = ({ pathToInputs }) => {
    test('input Arguments', () => {
        expect(fs.existsSync(pathToInputs)).toEqual(true)
    })
    const index = require('./index')({
        pathToInputs
    })
    test('input', () => {
        expect(index).toEqual(
            expect.any(Object)
        )
    })

    return index
}