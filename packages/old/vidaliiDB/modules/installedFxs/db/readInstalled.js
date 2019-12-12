const fs = require('fs')
const R = require('ramda')

const readInstalled = (pathToRead) => R.pipe(
    fs.readdirSync,
    R.map(x => {
        let nameFile = R.replace('.js', '', x)
        return {
            [nameFile]: require(pathToRead + '/' + x)
        }
    }),
    R.mergeAll
)(pathToRead)


module.exports = readInstalled

