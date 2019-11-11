import { equals, toLower } from 'ramda'
const memdown = require('memdown')

export default [
    ({ tableConfig }) => equals('inbrowserstorage', toLower(tableConfig.typeDb)),
    ({ tableConfig }) => {
        return memdown(tableConfig.path)
    }
]