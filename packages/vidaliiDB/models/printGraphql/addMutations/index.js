const R = require('ramda')
const readInstalled = require('./readInstalled')
const concatMutations = require('./concatMutations')
// const insertOne = require('./installed/insertOne.js/index.js.js')
// const updateOne = require('./installed/updateOne')



module.exports = ({ schemas }) => {

    // console.log(readInstalled(__dirname + '/installed'))
    // console.log(
    //     'concatMutations::',
    //     concatMutations({ schemas, sdlMutations: readInstalled(__dirname + '/installed') })
    // )

    return concatMutations({ schemas, sdlMutations: readInstalled(__dirname + '/installed') })
}