const R = require('ramda')
const buildType = require('./buildType')

// const getTypesSDL = (types) => R.pipe(
//     R.toPairs,
//     R.reduce((acc, [nameType, sdl]) => R.concat(acc, sdl), '')
// )(types)

const mergeSDL = objTypes => R.pipe(
    R.toPairs,
    R.reduce((acc, [nameSchema, { sdl }]) => R.concat(acc, sdl), '')
)(objTypes)

const mergeResolvers = objTypes => R.pipe(
    R.toPairs,
    R.reduce((acc, [nameSchema, { resolvers }]) => ({ ...acc, ...resolvers }), {})
)(objTypes)


module.exports = ({ schemas }) => {
    // var storeTypes = {}
    // var storeResolvers = {}
    // addTypes({ storeResolvers, storeTypes, childNode: schemas })

    // const {pointers(schemas)
    const types = buildType(schemas)
    // console.log(
    //     'getObjTypes::',
    //     types
    // )
    // console.log(
    //     'mergeResolvers::',
    //     mergeResolvers(types)
    // )
    // console.log(
    //     'mergeSDL::',
    //     mergeSDL(types)
    // )

    return {
        types,
        resolvers: mergeResolvers(types),
        sdl: mergeSDL(types)
    }
}