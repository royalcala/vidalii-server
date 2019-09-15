const R = require('ramda')
const firstUpper = require('../firstUpper')

const isNodeType = [
    ({ key, value }) => R.has('isNodeType', value),
    ({ key, value }) => ({
        type: 'isNodeType',
        sdl: `${key}:${value.type}`,
        resolver: R.has('useTypeResolver', value) ? {
            [key]: value.useTypeResolver({})//send the name of the model used in the schema
        } : {}
    })
]

const isArray = [
    ({ key, value }) => R.is(Array, value),
    ({ key, value, parentName }) => {
        let newTypeName = `${parentName}_${firstUpper(key)}`
        return {
            type: 'isArray',
            nextToProcess: {
                nameType: newTypeName,
                tree: value[0]
            },
            sdl: `${key}:[${newTypeName}]`,
            resolver: {}
        }
    }
]

const isObj = [
    ({ key, value }) => R.is(Object, value),
    ({ key, value, parentName }) => {
        let newTypeName = `${parentName}_${firstUpper(key)}`
        return {
            type: 'isObj',
            nextToProcess: {
                nameType: newTypeName,
                tree: value
            },
            sdl: `${key}:${parentName}_${firstUpper(key)}`,
            resolver: {}
        }
    }
]



const buildType = ({ parentSDL, parentResolvers, nameType, tree }) => {
    let newTypeName = `${firstUpper(nameType)}`
    // let completeNameType = `type ${newTypeName} {\n`

    let branches = R.pipe(
        R.toPairs,
        R.map(
            ([key, value]) => R.cond([
                isNodeType,
                isArray,//must to be before the isObj
                isObj
            ])({ key, value, parentName: newTypeName })
        )
    )(tree)

    let concatSDL = R.pipe(
        R.reduce((acc, { sdl }) => `${acc} ${sdl}\n`, `type ${newTypeName} {\n`),
        R.concat(R.__, '}\n'),
        R.concat(parentSDL)
    )(branches)
    
    const hasResolvers = x => R.pipe(R.keys, R.length)(x) > 0
    let dataResolvers = R.pipe(
        R.reduce((acc, { resolver }) => ({ ...acc, ...resolver }), {}),
        R.ifElse(
            hasResolvers,
            R.pipe(
                R.assoc(newTypeName, R.__, {}),
                x => ({ ...x, ...parentResolvers })
            ),
            x => ({ ...parentResolvers })
        )
        // R.assoc(newTypeName, R.__, {}),
        // x => ({ ...x, ...parentResolvers })
    )(branches)

    return R.reduce(
        (acc, node) => {
            return R.ifElse(
                R.has('nextToProcess'),
                () => buildType({
                    parentSDL: acc.sdl,
                    parentResolvers: acc.resolvers,
                    nameType: node.nextToProcess.nameType,
                    tree: node.nextToProcess.tree
                }),
                () => ({
                    sdl: acc.sdl,
                    resolvers: acc.resolvers
                })
            )(node)
            // if (R.has('nextToProcess', node)) {
            //     return buildType({
            //         parentSDL: acc.sdl,
            //         parentResolvers: acc.resolvers,
            //         nameType: node.nextToProcess.nameType,
            //         tree: node.nextToProcess.tree
            //     })
            // } else {
            //     return {
            //         sdl: acc.sdl,
            //         resolvers: acc.resolvers
            //     }
            // }
        },
        {
            sdl: concatSDL,
            resolvers: dataResolvers
        },
        branches)
}

function pointers(schemas) {
    var mainBranches = R.toPairs(schemas)
    // var pendingBranchesToProcess = []
    var getMainTypes = R.map(
        ([key, value]) => buildType({
            parentSDL: '',
            parentResolvers: {},
            nameType: key,
            tree: value
        }),
        mainBranches
    )
    return getMainTypes

}


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
                    [name]: node.useTypeResolver({})
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
    console.log(
        'pointers::',
        pointers(schemas))
    return {
        objTypes: storeTypes,
        sdlTypes: getTypesSDL(storeTypes),
        resolversTypes: storeResolvers
    }
}