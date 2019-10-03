const fs = require('fs')
const R = require('ramda')

const readModules = ({ pathToInputs, readComponets }) => R.pipe(
    fs.readdirSync,
    R.map(nameModule => {
        return {
            [nameModule]: {
                components: readComponets({
                    pathToComponents: pathToInputs + '/' + nameModule
                })
            }
        }
    }),
    R.mergeAll
)(pathToInputs)

module.exports = readModules