import { equals, toLower } from 'ramda'
const fse = require('fs-extra')
var leveldown = require('leveldown')

export default [
    ({ tableConfig }) => equals('instorage', toLower(tableConfig.typeDb)),
    ({ tableName, tableConfig }) => {
        let completePath = tableConfig.path + '/' + tableName
        fse.ensureDirSync(completePath)
        return leveldown(completePath)
    }
]