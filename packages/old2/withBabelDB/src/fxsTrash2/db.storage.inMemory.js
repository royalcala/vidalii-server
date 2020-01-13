import { equals, toLower } from 'ramda'
const memdown = require('memdown')

export default [
    ({ tableConfig }) => equals('inmemory', toLower(tableConfig.typeDb)),
    ({ tableConfig }) => memdown(tableConfig.path)
]