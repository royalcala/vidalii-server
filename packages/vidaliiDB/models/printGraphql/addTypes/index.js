const R = require('ramda')
const firstUpper = require('../firstUpper')

function addTypes({ storeResolvers, storeTypes, nameType = null, childNode }) {
    Object.entries(childNode).map(([name, node]) => {
        // if (R.is(Function, node)) {
        //     storeTypes[nameType] = `${storeTypes[nameType]} ${name}:${node.type}\n`

        // } 
        if (R.has('isNodeType', node)) {
            storeTypes[nameType] = `${storeTypes[nameType]} ${name}:${node.type}\n`
            if (R.has('useTypeResolver', node)) {
                storeResolvers[nameType] = {
                    ...storeResolvers[nameType],
                    [name]: node.useTypeResolver
                }
            }
        } else {
            if (nameType === null) {
                let upName = firstUpper(name)
                storeTypes[upName] = `type ${upName} {\n`
                addTypes({ storeResolvers, storeTypes, nameType: upName, childNode: node })
            } else {
                let upName = `${nameType}_${firstUpper(name)}`
                let childNode
                if (R.is(Array, node)) {
                    storeTypes[nameType] = `${storeTypes[nameType]} ${name}:[${upName}]\n`
                    childNode = node[0]
                } else {//if is Object only
                    storeTypes[nameType] = `${storeTypes[nameType]} ${name}:${upName}\n`
                    childNode = node
                }
                storeTypes[upName] = `type ${upName} {\n`
                addTypes({ storeResolvers, storeTypes, nameType: upName, childNode })
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

module.exports = ({ schemas }) => {
    var storeTypes = {}
    var storeResolvers = {}
    addTypes({ storeResolvers, storeTypes, childNode: schemas })
    return {
        objTypes: storeTypes,
        sdlTypes: getTypesSDL(storeTypes),
        resolversTypes: storeResolvers
    }
}