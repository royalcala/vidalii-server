const R = require('ramda')
const selectTypeDB = require('./selectTypeDB')

module.exports = ({ prevModels, prevSchemas }) => ({ name, schemaValidator, typeDB = 'pouchDB', url, db, username = null, password = null }) => {
    const ifDuplicateSchema = [
        ({ name }) => prevModels[name],
        ({ name }) => { throw new Error(`Your are trying to load a schema with name:'${name}' DUPLICATED`) }
    ]
    const addToModel = ({ name, schemaValidator }) => ({
        ...prevModels,
        [name]: selectTypeDB({ typeDB, schemaValidator, url, db, username, password })
    })



    var newModels = R.cond([
        ifDuplicateSchema,
        [R.T, addToModel]
    ])({ name, schemaValidator })


    var newSchemas = { ...prevSchemas, [name]: { ...schemaValidator } }

    return {
        newModels,
        newSchemas
    }


}
