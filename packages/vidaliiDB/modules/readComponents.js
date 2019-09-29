const fs = require('fs')
const R = require('ramda')
const readfxComponents = (pathToComponents) => R.pipe(
    fs.readdirSync,
    R.map(x => {
        let nameFile = R.replace('.js', '', x)
        return {
            [nameFile]: require(pathToComponents + '/' + x)
        }
    }),
    R.mergeAll
)(pathToComponents)
const fxComponents = readfxComponents(__dirname + '/installedTypesComponents')

const readComponents = ({ pathToComponents }) => R.pipe(
    fs.readdirSync,
    R.map(nameComponent => {
        return R.ifElse(
            R.has(nameComponent),
            () => ({
                [nameComponent]: fxComponents[nameComponent]({
                    pathToComponent: pathToComponents + '/' + nameComponent
                })
            }),
            () => {
                console.log(nameComponent, ' fxComponent not Found ')
                return {}
            }
        )(fxComponents)

        // R.cond([
        //     ifNotExistFxComponent,
        //     [R.T, () => ({
        //         [nameComponent]: fxComponents[nameComponent]({
        //             pathToComponent: pathToComponents + '/' + nameComponent
        //         })
        //     })
        //     ]

        // ])
    }),
    R.mergeAll
)(pathToComponents)


// const readModules = ({ pathToModules }) => R.pipe(
//     fs.readdirSync,
//     R.map(nameModule => {
//         return {
//             [nameModule]: readComponents({
//                 pathToComponents: pathToModules + '/' + nameModule
//             })
//         }
//     }),
//     R.mergeAll
// )(pathToModules)

module.exports = readComponents

