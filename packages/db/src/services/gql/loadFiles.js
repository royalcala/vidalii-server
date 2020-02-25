const glob = require("glob")
const fs = require('fs-extra')
const loadFiles = path => {
    const store = {
        sdls: '',
        resolvers: {}
    }
    glob.sync(path)
        .forEach(path => {
            const data = require("#/" + path)
            store.sdls = store.sdls.concat('\n' + data.sdl)
            store.resolvers = { ...store.resolver, ...data.resolver }
        })
    return store
}


export const directives = loadFiles(`src/gql/directives/*.js`)
// console.log('directives::', directives)
export const scalars = loadFiles(`src/gql/scalars/*.js`)
// console.log('scalars', scalars)
export const sdls = glob.sync(`src/gql/sdl/*.graphql`)
    .reduce((acc, path) => {
        let str = fs.readFileSync(path, 'utf8').toString()
        return acc.concat('\n', str)
    }, '')
// console.log('sdl', sdl)
