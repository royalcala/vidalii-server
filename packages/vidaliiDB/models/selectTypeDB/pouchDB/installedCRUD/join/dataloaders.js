const DataLoader = require('dataloader')

const batchData = async (keys) => {
    try {
        var response = await clients.find({
            selector: {
                _id: {
                    $in: keys
                }
            }
        })
        const grouped = R.groupBy(x => x._id, response.docs)
        return keys.map(k => grouped[k] || [])
    } catch (err) {
        console.log(err);
    }
}
// var salesloader = new DataLoader(keys => batchData(keys))

const dataLoaders = () => {
    var stores = {}

    return {
        load: ({ dbName, fromField, toField, cache = true }) => {
            let nameStore = `${dbName}|${fromField}|${toField}`
            if (R.has(nameStore, stores)) {

            } else {
                stores[nameStore] = new DataLoader(keys => batchData(keys))
                return stores[nameStore].load()
            }
        }
    }

}


module.exports = dataLoaders()