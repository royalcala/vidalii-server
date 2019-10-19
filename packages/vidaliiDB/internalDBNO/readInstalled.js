const fs = require('fs')
const R = require('ramda')
const readNodes = ({ pathToNodes }) => R.pipe(
    fs.readdirSync,
    R.map(x => {
        let nameFile = R.replace('.js', '', x)
        return {
            [nameFile]: require(pathToNodes + '/' + x)
        }
    }),
    R.mergeAll
)(pathToNodes)

module.exports = readNodes