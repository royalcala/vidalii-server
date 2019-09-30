const fs = require('fs')
const R = require('ramda')
const readModules = require('./readModules')
const readComponets = require('./readComponents')

module.exports = ({ pathToModules }) => {
    const modules = readModules({ pathToModules, readComponets })
    return modules
}