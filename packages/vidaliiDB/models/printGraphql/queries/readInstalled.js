const fs = require('fs')
const R = require('ramda')
const getMapObjectsFromFiles = pathToRead => R.map(
    fileName => [
        R.replace('.js', '', fileName),
        require(pathToRead + '/' + fileName)
    ]
)
const readInstalled = (pathToRead) => R.pipe(
    fs.readdirSync,
    getMapObjectsFromFiles(pathToRead)
)(pathToRead)

module.exports = readInstalled