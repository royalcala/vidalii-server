// const pathToInputs = "/home/roy/Documents/desarrollo/proys/vidalii-server/packages/vidaliiServer/servers/inputs"
const fs = require('fs')
const R = require('ramda')
var index = ''
module.exports = ({ pathToInputs }) => {

    describe('input', () => {
        test('Exist the pathToInputs?', () => {
            expect(fs.existsSync(pathToInputs)).toEqual(true)
        })
        index = require('./index')({
            pathToInputs
        })

        test('is not empty?', () => {
            expect(
                R.isEmpty(index)
            ).toEqual(false)
        })

    })

    return index
}