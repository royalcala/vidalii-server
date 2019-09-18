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
module.exports = ({ dataBase, dbName }) => async (data) => {

    return dataloaders.load({
        dataBase,
        joinData: { ...data }
    })
}