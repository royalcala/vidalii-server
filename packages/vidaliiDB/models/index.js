const R = require('ramda')

const selectTypeDB = require('./selectTypeDB')
const printGraphql = require('./printGraphql')


function main({ }) {
    var storeModels = {}
    var storeSchemas = {}
    return {
        schemas: () => storeSchemas,
        models: () => storeModels,
        printGraphql: () => printGraphql({ schemas: storeSchemas, models: storeModels }),
        loadSchema: ({ name, schemaValidator, typeDB = 'pouchDB', url, db, username = null, password = null }) => {
            const ifDuplicateSchema = [
                ({ name }) => storeModels[name],
                ({ name }) => { throw new Error(`Your are trying to load a schema with name:'${name}' DUPLICATED`) }
            ]
            const addToModel = ({ name, schemaValidator }) => ({
                ...storeModels,
                [name]: selectTypeDB({ typeDB, schemaValidator, url, db, username, password })
            })



            storeModels = R.cond([
                ifDuplicateSchema,
                [R.T, addToModel]
            ])({ name, schemaValidator })


            storeSchemas = { ...storeSchemas, [name]: { ...schemaValidator } }


        },

    }

}

module.exports = main