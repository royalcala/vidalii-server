const R = require('ramda')
const firstUpper = require('../firstUpper')

function addTypes({ storeTypes, nameType = null, childNode }) {
    Object.entries(childNode).map(([name, node]) => {
        if (R.is(Function, node)) {
            storeTypes[nameType] = `${storeTypes[nameType]} ${name}:${node.type}\n`

        } else {
            if (nameType === null) {
                let upName = firstUpper(name)
                storeTypes[upName] = `type ${upName} {\n`
                addTypes({ storeTypes, nameType: upName, childNode: node })
            } else {
                let upName = `${nameType}_${firstUpper(name)}`
                storeTypes[nameType] = `${storeTypes[nameType]} ${name}:${upName}\n`
                storeTypes[upName] = `type ${upName} {\n`
                addTypes({ storeTypes, nameType: upName, childNode: node })
            }



        }

    })
    if (nameType) {
        storeTypes[nameType] = storeTypes[nameType] + '}'
    }
}

const getTypesSDL = (types) => R.pipe(
    R.toPairs,
    R.reduce((acc, [nameType, sdl]) => R.concat(acc, sdl), '')
)(types)


// function main({ schemas }) {
//     var storeTypes = {}
//     addTypes({ storeTypes, childNode: schemas })

//     return storeTypes
// }
module.exports = ({ schemas }) => {
    var storeTypes = {}
    addTypes({ storeTypes, childNode: schemas })

    return {
        objTypes: storeTypes,
        sdlTypes: getTypesSDL(storeTypes)
    }
}