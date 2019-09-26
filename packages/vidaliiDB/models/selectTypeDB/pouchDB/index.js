const R = require('ramda')
const dataBase = require('./initDatabase')
const crud = require('./readInstalled')(__dirname + '/installedCRUD')

// const main = ({ schemaTools, typeDB, schemaValidator, url, nameSchema, username, password }) => {
const main = ({ nameSchema, valueSchema, crudPlugins }) => {
    // const { schema, database } = valueSchema
    // var dataBase = new PouchDB(`${url}/${db}`)
    var sendToCRUDMethods = {
        ...crudPlugins,
        db: dataBase({ url: valueSchema.database.url, dbName: nameSchema }),
        modelName: nameSchema,
        nameSchema,
        valueSchema,
        // url,
        // schemaTools,
        // schemaValidator
    }
    // return {
    //     insertOne: crud.insertOne(initData),
    //     find: crud.find(initData),
    //     join: crud.join(initData),
    //     updateOne: crud.updateOne(initData),
    // }
    return R.pipe(
        R.toPairs,
        R.reduce(
            (acc, [fxName, fx]) => R.assoc(fxName, fx(sendToCRUDMethods), acc),
            {}
        )
    )(crud)
}
const pouchDB = [
    ({ valueSchema }) => R.equals('pouchdb', R.toLower(valueSchema.database.typeDB)),
    main
]

module.exports = pouchDB