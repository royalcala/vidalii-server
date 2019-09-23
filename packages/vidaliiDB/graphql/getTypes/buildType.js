const R = require('ramda')
const formatType = require('../../shared/graphql.formatType')

const isNodeType = [
    ({ key, value }) => R.has('isNodeType', value),
    ({ tools, key, value }) => ({
        type: 'isNodeType',
        sdl: `${key}:${value.type}`,
        resolver: R.has('useTypeResolver', value) ? {
            [key]: value.useTypeResolver({
                models: tools.models,
                schemaName: tools.schemaName
            })
        } : {}
    })
]

const isArray = [
    ({ key, value }) => R.is(Array, value),
    ({ key, value, parentName }) => {
        // let newTypeName = `${parentName}_${key}`
        let newTypeName = formatType({ parent: parentName, child: key })
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
        // let newTypeName = `${parentName}_${key}`
        let newTypeName = formatType({ parent: parentName, child: key })
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



const buildType = ({ tools, parentSDL, parentResolvers, nameType, tree }) => {
    // let newTypeName = `${firstUpper(nameType)}`
    let newTypeName = formatType({ parent: null, child: nameType })

    let branches = R.pipe(
        R.toPairs,
        R.map(
            ([key, value]) => R.cond([
                isNodeType,
                isArray,//must to be before the isObj
                isObj
            ])({ tools, key, value, parentName: newTypeName })
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
    )(branches)

    return R.reduce(
        (acc, node) => {
            return R.ifElse(
                R.has('nextToProcess'),
                () => buildType({
                    tools,
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
        },
        {
            sdl: concatSDL,
            resolvers: dataResolvers
        },
        branches)
}

const getObjTypes = ({ schemas, models }) => R.pipe(
    R.toPairs,
    R.map(
        ([key, value]) => ({
            [key]: buildType({
                tools: { models, schemaName: key },
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