import evol from './evol'
import { cond, equals } from 'ramda'
// import hola from './src'
// import data1 from './src/data1'
// yarn add @babel/preset-env --dev
// npx babel index.js --out-file script-compiled.js

console.clear()
console.log('Screen cleaned. In WithBabel')

const fxsToEvol = [
    [
        'config',
        () => ({
            // dir: __dirname + '/data',
            alias: 'test1',
            env: {
                type: 'node',//browser||node
                nodeConfig: {
                    pathdb: __dirname + '/db'
                },
                browserConfig: {

                }
            },
            rev: {
                number: 10
            },
            replication: {
                byDatabase: [
                    { db: '', from: true, to: false }
                ],
                byFx: [
                    { fx: (doc) => '' }
                ]
            },
        }),

    ],
    [
        'db',
        ({ config }) => {
            var fs = require('fs')
            var levelup = require('levelup')
            var leveldown = require('leveldown')


            const createdb = ({ config, name }) => {
                const pathDir = config.env.nodeConfig.pathdb
                const pathNameDb = `${config.env.nodeConfig.pathdb}/${name}`
                // console.log(pathdb)
                if (!fs.existsSync(pathDir)) {
                    fs.mkdirSync(pathDir);
                }
                if (!fs.existsSync(pathNameDb)) {
                    fs.mkdirSync(pathNameDb);
                }
                var db = levelup(leveldown(pathNameDb))
                return db
            }
            const isNode = ({ config }) => {

                return {
                    docs: createdb({ config, name: 'docs' }),
                    rev: createdb({ config, name: 'rev' }),
                    seq: createdb({ config, name: 'seq' })
                }

            }
            const ifIsBrowser = [
                ({ config }) => equals(config.env.type, 'browser'),
                () => 'is browser enviroment'
            ]
            const ifIsNode = [
                ({ config }) => equals(config.env.type, 'node'),
                isNode
            ]
            return cond([
                ifIsBrowser,
                ifIsNode
            ])({ config })
        }
    ]
]

var resultEvol = evol(...fxsToEvol)

console.log(
    'resultEvol:',
    resultEvol
)
// var requireContext = require('require-context');
// var data = requireContext(__dirname + '/src', true, /\.index\.js$/)
// console.log(
//     'data::',
//     data('data1/index.js')
// )

// function importAll(r) {

//     console.log('r::', r)
//     console.log('keys::',r.keys())

//     r.keys().forEach((key) => {
//         console.log('keys:', key)
//         console.log(
//             'resolve:',
//             r(key)
//         )
//         return key
//     });
// }

// importAll(requireContext(__dirname + '/src', true, /\.js$/));