const glob = require("glob")
const fs = require('fs-extra')
export const loadModules = path => glob.sync(path).reduce(
    (acc, path) => {
        let data = require(fs.realpathSync(path))
        return {
            sdl: acc.sdl.concat('\n' + data.sdl),
            resolver: { ...acc.resolver, ...data.resolver }
        }
    }, {
    sdl: '',
    resolver: {}
})

export const loadGraphqls = path => glob.sync(path)
    .reduce((acc, path) => {
        let str = fs.readFileSync(fs.realpathSync(path), 'utf8').toString()
        return {
            sdl: acc.sdl.concat('\n' + str),
            resolver: {}
        }
    }, {
        sdl: '',
        resolver: {}
    })



// export const directives = loadFiles(`src/gql/directives/*.js`)
// export const scalars = loadFiles(`src/gql/scalars/*.js`)
// export const sdls = glob.sync(`src/gql/sdl/*.graphql`)
//     .reduce((acc, path) => {
//         let str = fs.readFileSync(path, 'utf8').toString()
//         return acc.concat('\n', str)
//     }, '')
