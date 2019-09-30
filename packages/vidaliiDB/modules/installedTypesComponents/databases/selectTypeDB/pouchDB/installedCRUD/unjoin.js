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
module.exports = () => async ({ fieldName, fieldValue }) => {
    const { modelName } = crudPlugins
    return dataloaders.unload({
        tableName: modelName,
        fieldName,
        fieldValue
    })
}