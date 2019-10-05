const R = require('ramda')
const dataBase = require('./initDatabase')
const crud = require('./readInstalled')(__dirname + '/installedCRUD')

// module.exports = ({ updateDoc, validateDoc }) => ({ nameSchema, valueSchema }) => {
module.exports = ({ url, dbName }) => {
    // const { schema, database } = valueSchema
    // var dataBase = new PouchDB(`${url}/${db}`)
    var sendToCRUDMethods = {
        // ...crudPlugins,
        // updateDoc,
        // validateDoc,
        db: dataBase({ url, dbName }),
        // modelName: nameSchema,
        dbName
        // nameSchema,
        // valueSchema
    }
    // }
    return R.pipe(
        R.toPairs,
        R.reduce(
            (acc, [fxName, fx]) => R.assoc(fxName, fx(sendToCRUDMethods), acc),
            {}
        )
    )(crud)
}
// const pouchDB = [
//     ({ valueSchema }) => R.equals('pouchdb', R.toLower(valueSchema.database.typeDB)),
//     main
// ]
