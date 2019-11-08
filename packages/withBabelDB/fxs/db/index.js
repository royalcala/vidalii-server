import { cond, equals, reduce, assoc, toPairs } from 'ramda'
// import forNode from './forNode'
// import forBrowser from './forBrowser'
import type_inStorage from './typesDb/inStorage'
import type_inMemory from './typesDb/inMemory'
// const ifIsBrowser = [
//     ({ config }) => equals(config.env.type, 'browser'),
//     forBrowser
// ]
// const ifIsNode = [
//     ({ config }) => equals(config.env.type, 'node'),
//     forNode
// ]

// export default ({ config }) => cond([
//     ifIsBrowser,
//     ifIsNode
// ])({ config })
// const createDirsIfNotExist = ({ pathDir, pathNameDb }) => {
//     var fs = require('fs')
//     if (!fs.existsSync(pathDir)) {
//         fs.mkdirSync(pathDir);
//     }
//     if (!fs.existsSync(pathNameDb)) {
//         fs.mkdirSync(pathNameDb);
//     }
// }
// const createTable = ({ config }) => {

//     // var levelup = require('levelup')
//     //warning N-API, is here
//     // var leveldown = require('leveldown')
//     // var encode = require('encoding-down')
//     // var encoding = encodingdb({ config })
//     // // console.log('encoding:', encoding)
//     // const pathDir = config.env.nodeConfig.pathdb
//     // const pathNameDb = `${config.env.nodeConfig.pathdb}/${name}`

//     // createDirsIfNotExist({ pathDir, pathNameDb })
//     var tables = (Object.entries(config.tables)).reduce(
//         (acc, [tableName, tableConfig]) => {

//             var initTypeDb = cond([
//                 [equals('leveldb'), () => {
//                     fse.ensureDirSync(config.pathdb.backend)
//                 }],
//             ])(tableConfig.typeDb)

//             return {
//                 ...acc,
//                 [tableName]: initTypeDb
//             }
//         },
//         {}
//     )



//     return leveldown(pathNameDb)
//     // levelup(
//     //     encode(
//     //         leveldown(pathNameDb),
//     //         encoding
//     //     )
//     // )
// }





const condTables = args => cond([
    type_inStorage,
    type_inMemory
])(args)

const createTables = args => reduce(
    (acc, [tableName, tableConfig]) =>
        assoc
            (
                tableName,
                condTables({ tableName, tableConfig }),
                acc
            ),
    {}
)(toPairs(args.config.tables))

export default ({ config }) => {
    var tables = createTables({ config })
    // console.log('tables::', tables)
    return tables
}

// [
//     'db',
//     ({ config }) => {
//         var fs = require('fs')
//         var levelup = require('levelup')
//         var leveldown = require('leveldown')


//         const createdb = ({ config, name }) => {
//             const pathDir = config.env.nodeConfig.pathdb
//             const pathNameDb = `${config.env.nodeConfig.pathdb}/${name}`
//             // console.log(pathdb)
//             if (!fs.existsSync(pathDir)) {
//                 fs.mkdirSync(pathDir);
//             }
//             if (!fs.existsSync(pathNameDb)) {
//                 fs.mkdirSync(pathNameDb);
//             }
//             var db = levelup(leveldown(pathNameDb))
//             return db
//         }
//         const isNode = ({ config }) => {

//             return {
//                 docs: createdb({ config, name: 'docs' }),
//                 rev: createdb({ config, name: 'rev' }),
//                 seq: createdb({ config, name: 'seq' })
//             }

//         }
//         const ifIsBrowser = [
//             ({ config }) => equals(config.env.type, 'browser'),
//             () => 'is browser enviroment'
//         ]
//         const ifIsNode = [
//             ({ config }) => equals(config.env.type, 'node'),
//             isNode
//         ]
//         return cond([
//             ifIsBrowser,
//             ifIsNode
//         ])({ config })
//     }
// ]