const fs = require('fs')
const R = require('ramda')
// const processLayer = ({ input, pathToLayer }) => R.pipe(
//     fs.readdirSync,
//     R.map(x => {
//         let nameFile = R.replace('.js', '', x)
//         return {
//             [nameFile]: require(pathToLayer + '/' + x)
//         }
//     }),
//     R.mergeAll
// )(pathToLayer)

const processLayer = ({ inputData, nodes }) => R.pipe(
    R.toPairs,
    R.map(([nameNode, valueNode]) => {
        return {
            [nameNode]: valueNode({ inputData })
        }
    }),
    R.mergeAll
)(nodes)

module.exports = processLayer