const Path = require('path')
const Glob = require("glob")


export const loadResolvers = (instance, type, path) => {
    Glob.sync(path)
        .forEach(path => {
            instance.add(
                {
                    ...require('../../../' + path),
                    alias: Path.basename('../../../' + path, '.js'),
                    type
                }
            )
        })
}
