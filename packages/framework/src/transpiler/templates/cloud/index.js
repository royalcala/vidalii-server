const fs = require('fs-extra')
const createDirectories = require('./createDirectories')
const createFiles = require('./createFiles')

const buildTemplate = (rootPath) => {
        createDirectories(rootPath)
        createFiles(rootPath)
}
module.exports = buildTemplate