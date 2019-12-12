const fs = require('fs')
const R = require('ramda')

const readNodes = ({ pathToNodes }) => R.pipe(
    fs.readdirSync,
    R.map(x => {
        let nameFile = R.replace('.js', '', x)
        // console.log('nameFile::', nameFile)
        let pathName = pathToNodes + '/' + x + '/' + 'index.test.js'
        // console.log('pathName::',pathName)
        try {
            return {
                [nameFile]: require(pathName)
            }
        } catch (error) {
            console.log('NO EXIST THE index.test.js in function:', nameFile)
        }

    }),
    R.mergeAll
)(pathToNodes)

module.exports = readNodes