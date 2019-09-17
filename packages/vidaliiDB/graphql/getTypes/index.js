const R = require('ramda')
const buildType = require('./buildType')

const mergeSDL = objTypes => R.pipe(
    R.toPairs,
    R.reduce((acc, [nameSchema, { sdl }]) => R.concat(acc, sdl), '')
)(objTypes)

const mergeResolvers = objTypes => R.pipe(
    R.toPairs,
    R.reduce((acc, [nameSchema, { resolvers }]) => ({ ...acc, ...resolvers }), {})
)(objTypes)


module.exports = ({ schemas, models }) => {
    const types = buildType({ schemas, models })

    return {
        types,
        resolvers: mergeResolvers(types),
        sdl: mergeSDL(types)
    }
}