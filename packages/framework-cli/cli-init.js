#!/usr/bin/env node
// const add = require('./index')
// import * as yargs from "yargs";
const yargs = require('yargs')
const chalk = require("chalk")
const { createGql, createOrm } = require('./createDirectories')
// import {  } from "./createDirectories";
// console.log('in vidalii-cli')
// // console.log(process.argv)
// console.log(
//     add(
//         Number(process.argv[2]),
//         Number(process.argv[3]),
//     )
// )

console.log('created in root app:', rootAppDir)
// const dir_graphql = fs.realpathSync('/scr/graphql2')

// // const desiredMode = 0o2775
// // const options = {
// //   mode: 0o2775
// // }

// fs.ensureDirSync(rootAppDir + '/gql')
// dir has now been created, including the directory it is to be placed in

// fs.ensureDirSync(dir, desiredMode)
// // dir has now been created, including the directory it is to be placed in with permission 0o2775

// fs.ensureDirSync(dir, options)
// // dir has now been created, including the directory it is to be placed in with permission 0o2775