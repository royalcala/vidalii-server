#!/usr/bin/env node
const argv = require('yargs').argv
const chalk = require("chalk")
const fs = require('fs-extra')
const rootAppDir = fs.realpathSync('./') //root dir of the app
const mkdir = require('./createDirectories')
const templates = require('./createTemplates')
const package = require('./updatePackagesFile')

if (argv.init) {
    if (fs.existsSync(rootAppDir + '/src')) {
        console.log(chalk.red(
            '***Error. You first must to backup the dir:/src and delete***'
        ))
    } else {
        mkdir.createGql()
        mkdir.createOrm()
        templates.createIndex()
        templates.createOrm()
        package.update()
        console.log(chalk.green(
            '**Correct.Vidalii --init was exec**'
        ));
    }



}