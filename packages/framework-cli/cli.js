#!/usr/bin/env node
const argv = require('yargs').argv
console.log('%cargv', 'color: #f2ceb6', argv);
const chalk = require("chalk")
const { createGql, createOrm, updatePackageJson } = require('./createDirectories')

if (argv.init) {
    createGql()
    createOrm()
    updatePackageJson()
    console.log(chalk.green(
        '**used --init**'
    ));
}