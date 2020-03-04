
// const argv = require('yargs').argv
// const chalk = require("chalk")
const fs = require('fs-extra')
// const rootAppDir = fs.realpathSync('./') //root dir of the app
const createDirectories = require('./createDirectories')
const createFiles = require('./createFiles')

const buildTemplate = (rootPath) => {
    if (fs.existsSync(rootPath + '/src')) {
        console.log(
            `***Error. You first must to backup the dir:${rootpath}/src and delete***`
        )
    } else {
        createDirectories(rootPath)
        createFiles(rootPath)
        packageJSON.update()
        console.log(chalk.green(
            '**Correct.Vidalii --init was exec**'
        ));
    }
}
module.exports = buildTemplate