const fs = require('fs')
const R = require('ramda')
const readComponents = (pathToComponents) => R.pipe(
    fs.readdirSync,
    R.map(x => {
        let nameFile = R.replace('.js', '', x)
        return {
            [nameFile]: require(pathToComponents + '/' + x)
        }
    }),
    R.mergeAll
)(pathToComponents)

module.exports = readComponents