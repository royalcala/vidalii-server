const fs = require('fs')
const R = require('ramda')

const readModules = ({ pathToModules, readComponets }) => R.pipe(
    fs.readdirSync,
    R.map(nameModule => {
        return {
            [nameModule]: {
                components: readComponets({
                    pathToComponents: pathToModules + '/' + nameModule
                })
            }
        }
    }),
    R.mergeAll
)(pathToModules)

module.exports = readModules