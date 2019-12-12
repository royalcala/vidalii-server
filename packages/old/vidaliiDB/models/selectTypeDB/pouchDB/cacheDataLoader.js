const R = require('ramda')
const DataLoader = require('dataloader')
const PouchDB = require('pouchdb')
const PouchDBFind = require('pouchdb-find')

const batchData = async ({ dataBase, nameKey, keys }) => {
    PouchDB.plugin(PouchDBFind)
    try {
        let query = {
            selector: {
                // _id: {
                [nameKey]: {
                    $in: keys
                }
            }
        }
        // var response = await clients.find({
        let response = await dataBase.find(query)
        // console.log('response::', response)
        let grouped = R.groupBy(x => x._id, response.docs)
        let final = keys.map(k => grouped[k] || [])
        // console.log('final::', final)
        return final
    } catch (err) {
        console.log(err);
    }
}
// var salesloader = new DataLoader(keys => batchData(keys))
const formatNameCache = ({ tableName, fieldName }) => `${tableName}|${fieldName}`
const dataLoaders = () => {
    var caches = {}

    return {
        load: ({ dataBase, joinData, cache = true }) => {
            const { toField, fromField } = joinData
            let nameCache = formatNameCache({ tableName: toField.tableName, fieldName: toField.fieldName })
            if (R.has(nameCache, caches)) {
                return caches[nameCache].load(fromField.value)
            } else {
                caches[nameCache] = new DataLoader(
                    keys => batchData({
                        dataBase,
                        nameKey: toField.fieldName,
                        keys
                    }),
                    // { batch: false }
                )
                return caches[nameCache].load(fromField.value)
            }
        },
        unload: ({ tableName, fieldName, fieldValue }) => {
            // let nameCache = `${toField.tableName}|${toField.fieldName}`
            let nameCache = formatNameCache({ tableName, fieldName })
            return caches[nameCache].clear(fieldValue)
        }
    }

}


module.exports = dataLoaders()