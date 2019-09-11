const fs = require('fs')
const R = require('ramda')
// const buildType = require('./buildType')

const readInstalled = (pathToRead) => R.pipe(
    fs.readdirSync,
    R.map(x => {
        let nameFile = R.replace('.js', '', x)
        return {
            // [nameFile]: buildType({
            //     nameFile,
            //     ...require(pathToRead + '/' + x)
            // })
            [nameFile]: require(pathToRead + '/' + x)

        }
    }),
    R.mergeAll
)(pathToRead)


module.exports = {
    ...readInstalled(__dirname + '/installed'),
    // custom: buildType
}
