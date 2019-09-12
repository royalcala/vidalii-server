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
var salesloader = new DataLoader(keys => batchData(keys))

module.exports = ''