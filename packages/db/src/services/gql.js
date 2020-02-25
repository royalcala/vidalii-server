const glob = require("glob")
// const Path = require('path')

const loadFiles = path => {
    const store = {
        sdl: '',
        resolver: {}
    }
    glob.sync(path)
        .forEach(path => {
            const data = require("#/" + path)
            store.sdl = store.sdl.concat(data.sdl)
            store.resolver = { ...store.resolver, ...data.resolver }
        })
    return store
}

const directives = loadFiles(`src/gql/directives/*.js`)
console.log('directives::', directives)
const sdl = loadFiles(`src/gql/sdl/*.js`)
console.log('sdl', sdl)
const scalars = loadFiles(`src/gql/scalars/*.js`)
console.log('scalars', scalars)