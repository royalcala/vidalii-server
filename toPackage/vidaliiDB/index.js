const R = require('ramda')
const validator = require('../validatorSchema')
const selectTypeDB = require('./selectTypeDB')



function main({ }) {
    var models = {}
    var errorsValidation = []
    return {
        printSchemas: () => {
            return models
        },
        loadSchema: ({ name, schemaValidator, typeDB = 'pouchDB', url, db, username = null, password = null }) => {
            const ifDuplicateSchema = [
                ({ name }) => models[name],
                ({ name }) => { throw new Error(`Your are trying to load a schema '${name}' DUPLICATED`) }
            ]
            const ifAddSchema = [
                R.T,
                ({ name, schemaValidator }) => ({
                    ...models,
                    [name]: selectTypeDB({ typeDB, validator, schemaValidator, url, db, username, password })
                })
            ]

            models = R.cond([
                ifDuplicateSchema,
                ifAddSchema
            ])({ name, schemaValidator })

        },
        models: () => models
        // validateData: schemaName => ({ prevData = null, newData }) => {
        //     var newData = evolve({
        //         schemaValidator: storageSchemas[schemaName],
        //         prevData,
        //         newData
        //     })
        // },
        // getTypes: schemaName => {

        //     return 'schema with types'
        // }
    }

}

module.exports = main