const dataloaders = require('../cacheDataLoader')
// let data = {
//     fromField: {
//         key: nameFromField,
//         value: R.path([nameFromField], parent),
//     },
//     toField: {
//         tableName: toTableName,
//         fieldName: toFieldName
//     }
// }
module.exports = ({ dataBase, dbName }) => async ({ fieldName, fieldValue }) => {
    // PouchDB.plugin(PouchDBFind)
    // console.log('dbName used::', dbName)
    // return ''
    return dataloaders.unload({
        tableName: dbName,
        fieldName,
        fieldValue
    })
}