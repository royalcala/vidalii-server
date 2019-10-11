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
module.exports = ({ db }) => async (data) => {        
    return dataloaders.load({
        dataBase: db,
        joinData: { ...data }
    })
}
// module.exports = (crudPlugins) => async (data) => {
//     const { db } = crudPlugins
//     return dataloaders.load({
//         dataBase: db,
//         joinData: { ...data }
//     })
// }