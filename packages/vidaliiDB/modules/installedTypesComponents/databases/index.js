const R = require('ramda')
const fs = require('fs')
const typesDB = require('./readInstalled')(__dirname + '/' + 'installedTypesDB')
const validators = require('./readInstalled')(__dirname + '/' + 'installedValidators')
console.log('validators::', validators)

const defaultsValues = databases => {
    databases.validatorDoc = databases.validatorDoc || validators.validateDoc
    databases.updateDoc = databases.updateDoc || validators.updateDoc
    return databases
}

module.exports = ({ pathToComponent }) => {
    let databases = require(pathToComponent + '/' + 'index.js')({ typesDB, validators })
    const withDefaults = defaultsValues(databases)

    return withDefaults
}