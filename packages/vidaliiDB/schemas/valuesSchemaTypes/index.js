const fs = require('fs')
const R = require('ramda')
const buildType = require('./newType')



const readInstalled = (pathToRead) => R.pipe(
    fs.readdirSync,
    R.map(x => ({
        [R.replace('.js', '', x)]: buildType(require(pathToRead + '/' + x))
    })),
    R.mergeAll
)(pathToRead)


module.exports = {
    ...readInstalled(__dirname + '/installed'),
    custom: buildType
}
