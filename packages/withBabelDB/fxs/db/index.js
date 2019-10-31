import { cond, equals } from 'ramda'
import forNode from './forNode'
import forBrowser from './forBrowser'

const ifIsBrowser = [
    ({ config }) => equals(config.env.type, 'browser'),
    forBrowser
]
const ifIsNode = [
    ({ config }) => equals(config.env.type, 'node'),
    forNode
]

export default ({ config }) => cond([
    ifIsBrowser,
    ifIsNode
])({ config })


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