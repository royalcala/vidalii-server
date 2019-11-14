import { compose, reduce, assoc, cond, __, toPairs, equals, toLower } from 'ramda'

// const typedb_inMemory = [
//     ({ tableConfig }) => equals('inmemory', toLower(tableConfig.typeDb)),
//     ({ tableConfig }) => {
//         const memdown = require('memdown')
//         memdown(tableConfig.path)
//     }
// ]
// const typedb_inStorage = [
//     ({ tableConfig }) => equals('instorage', toLower(tableConfig.typeDb)),
//     ({ tableName, tableConfig }) => {
//         const fse = require('fs-extra')
//         var leveldown = require('leveldown')
//         let completePath = tableConfig.path + '/' + tableName
//         fse.ensureDirSync(completePath)
//         return leveldown(completePath)
//     }
// ]

// export default ({ config }) => compose(
//     reduce(__, {}, toPairs(config.tables)),
//     condition => (acc, [tableName, tableConfig]) => assoc(
//         tableName,
//         condition({ tableName, tableConfig }),
//         acc
//     ),
//     cond
// )([
//     typedb_inStorage,
//     typedb_inMemory
// ])

const typedb_inMemory = [
    ({ tableConfig }) => equals('inmemory', toLower(tableConfig.typeDb)),
    ({ tableConfig }) => {
        const memdown = require('memdown')
        memdown(tableConfig.path)
    }
]
const typedb_inStorage = [
    ({ tableConfig }) => equals('instorage', toLower(tableConfig.typeDb)),
    ({ tableName, tableConfig }) => {
        const fse = require('fs-extra')
        var leveldown = require('leveldown')
        let completePath = tableConfig.path + '/' + tableName
        fse.ensureDirSync(completePath)
        return leveldown(completePath)
    }
]
export default (tableName) => ({ config }) => cond([
    typedb_inStorage,
    typedb_inMemory
])({
    tableName,
    tableConfig: config.tables[tableName]
})
