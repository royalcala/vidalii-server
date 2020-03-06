const glob = require("glob")
const fs = require('fs-extra')
var { extname } = require('path');
//Return the extension:
// var ext = path.extname('/Users/Refsnes/demo_path.js'); == .js



// https://www.npmjs.com/package/minimatch
export const loadFiles = minimatch => glob.sync(minimatch).reduce(
    (acc, path) => {
        const realPath = fs.realpathSync(path) //path of root path of the app not of the package
        switch (extname(path)) {
            case '.js':
                const { sdl, resolver } = require(realPath)
                return {
                    sdl: acc.sdl.concat('\n' + sdl),
                    resolver: { ...acc.resolver, ...resolver }
                }
            case '.graphql':
                const str = fs.readFileSync(fs.realpathSync(path), 'utf8').toString()
                return {
                    sdl: acc.sdl.concat('\n' + str),
                    resolver: { ...acc.resolver }
                }
        }
    },
    {
        sdl: '',
        resolver: {}
    }
)


////deprected
export const loadModules = path => glob.sync(path).reduce(
    (acc, path) => {
        let { sdl, resolver } = require(fs.realpathSync(path))
        return {
            sdl: acc.sdl.concat('\n' + sdl),
            resolver: { ...acc.resolver, ...resolver }
        }
    },
    {
        sdl: '',
        resolver: {}
    })

export const loadGraphqls = path => glob.sync(path).reduce(
    (acc, path) => {
        let str = fs.readFileSync(fs.realpathSync(path), 'utf8').toString()
        return {
            sdl: acc.sdl.concat('\n' + str),
            resolver: {}
        }
    }, {
    sdl: '',
    resolver: {}
})

