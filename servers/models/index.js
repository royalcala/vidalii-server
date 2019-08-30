const fs = require('fs')
const R = require('ramda')

//schemas
//

const readInstalled = (pathToRead) => R.pipe(
    fs.readdirSync,
    R.map(x => ({
        a: require(pathToRead + '/' + x)
    })
    ),
    // R.mergeAll
)(pathToRead)

console.log(readInstalled(__dirname + '/schemasInstalled'))

module.exports = ''
