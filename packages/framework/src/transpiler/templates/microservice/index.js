
// const argv = require('yargs').argv
// const chalk = require("chalk")
const fs = require('fs-extra')
// const rootAppDir = fs.realpathSync('./') //root dir of the app
const createDirectories = require('./createDirectories')
const createFiles = require('./createFiles')

const buildTemplate = (rootPath) => {
        createDirectories(rootPath)
        createFiles(rootPath)
}
module.exports = buildTemplate