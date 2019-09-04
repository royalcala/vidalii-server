const R = require('ramda')

const selectTypeDB = require('./selectTypeDB')
const printGraphql = require('./printGraphql')


function main({ }) {
    var models = {}
    var schemas = {}
    return {
        printSchemas: () => schemas,
        printModels: () => models,
        printGraphql: () => printGraphql(schemas),
        loadSchema: ({ name, schemaValidator, typeDB = 'pouchDB', url, db, username = null, password = null }) => {
            const ifDuplicateSchema = [
                ({ name }) => models[name],
                ({ name }) => { throw new Error(`Your are trying to load a schema '${name}' DUPLICATED`) }
            ]
            const addToModel = ({ name, schemaValidator }) => ({
                ...models,
                [name]: selectTypeDB({ typeDB, schemaValidator, url, db, username, password })
            })



            models = R.cond([
                ifDuplicateSchema,
                [R.T, addToModel]
            ])({ name, schemaValidator })


            schemas = { ...schemas, [name]: { ...schemaValidator } }


        },

    }

}

module.exports = main