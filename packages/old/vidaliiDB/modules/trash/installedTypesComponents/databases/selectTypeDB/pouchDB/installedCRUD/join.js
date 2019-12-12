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
module.exports = (crudPlugins) => async (data) => {
    const { db } = crudPlugins
    return dataloaders.load({
        dataBase: db,
        joinData: { ...data }
    })
}