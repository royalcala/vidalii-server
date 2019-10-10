const fs = require('fs')
const R = require('ramda')

const readNodes = ({ pathToNodes }) => R.pipe(
    fs.readdirSync,
    R.map(x => {
        let nameFile = R.replace('.js', '', x)
        // console.log('nameFile::', nameFile)
        let pathName = pathToNodes + '/' + x + '/' + 'index.test.js'
        // console.log('pathName::',pathName)
        return {
            [nameFile]: require(pathName)
        }
    }),
    R.mergeAll
)(pathToNodes)

module.exports = readNodes