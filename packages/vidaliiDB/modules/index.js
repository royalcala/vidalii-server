const fs = require('fs')
const R = require('ramda')
const readComponetsOfModule = require('./readComponents')
// const readComponentsModule = ({ pathToComponents }) => R.pipe(
//     fs.readdirSync,
//     R.map(nameComponent => {
//         return {
//             [nameComponent]: {
//                 pathToComponents
//             }
//         }
//     }),
//     R.mergeAll
// )(pathToComponents)


const readModules = ({ pathToModules }) => R.pipe(
    fs.readdirSync,
    R.map(nameModule => {
        return {
            [nameModule]: readComponetsOfModule({
                pathToComponents: pathToModules + '/' + nameModule
            })
        }
    }),
    R.mergeAll
)(pathToModules)

module.exports = readModules

