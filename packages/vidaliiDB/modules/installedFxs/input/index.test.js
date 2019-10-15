// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"
const fs = require('fs')
var index = ''
module.exports = ({ pathToInputs }) => {

    describe('input', () => {
        test('Arguments', () => {
            expect(fs.existsSync(pathToInputs)).toEqual(true)
        })
        const input = require('./index')({
            pathToInputs
        })
        index = input
        test('result', () => {
            expect(index).toEqual(
                expect.any(Object)
            )
        })
    })

    return index
}