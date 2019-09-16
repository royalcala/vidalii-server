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
        // let newTypeName = `${parentName}_${firstUpper(key)}`
        // let newTypeName = firstUpper(`${parentName}_${key}`)
        let newTypeName = `${parentName}_${key}`
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
        // let newTypeName = `${parentName}_${firstUpper(key)}`
        let newTypeName = `${parentName}_${key}`
        return {
            type: 'isObj',
            nextToProcess: {
                nameType: newTypeName,
                tree: value
            },
            sdl: `${key}:${newTypeName}`,
            resolver: {}
        }
    }
]

const buildType = ({ parentSDL, parentResolvers, nameType, tree }) => {
    let newTypeName = `${firstUpper(nameType)}`
    // let newTypeName = R.pipe(R.split('_'), R.splitAt(1))(nameType)

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

const getObjTypes = schemas => R.pipe(
    R.toPairs,
    R.map(
        ([key, value]) => ({
            [key]: buildType({
                parentSDL: '',
                parentResolvers: {},
                nameType: key,
                tree: value
            })
        })

    ),
    R.mergeAll
)(schemas)

module.exports = getObjTypes