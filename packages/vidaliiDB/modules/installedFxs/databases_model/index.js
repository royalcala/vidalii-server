const R = require('ramda')
// const fs = require('fs')
const typesDB = require('./readInstalled')(__dirname + '/' + 'installedTypesDB')
const validators = require('./readInstalled')(__dirname + '/' + 'installedValidators')

const defaultsValues = databases => R.pipe(
    R.map(schema => {
        schema.validateDoc = schema.validateDoc || validators.validateDoc
        schema.updateDoc = schema.updateDoc || validators.updateDoc
        schema.typeDB({
            updateDoc: schema.updateDoc,
            validateDoc: schema.validateDoc,
        })
        return schema
    })
)(databases)

// module.exports = ({ pathToComponent }) => {
//     // let databases = require(pathToComponent + '/' + 'index.js')({ typesDB, validators })
//     // const withDefaults = defaultsValues(databases)
//     let appInput = require(pathToComponent + '/' + 'index.js')

//     return R.pipe(
//         appInput,
//         defaultsValues
//     )({ typesDB, validators })
// }

module.exports = ({ schemas, databases_merge = null }) => {

    return 'Im databases_merge'
}