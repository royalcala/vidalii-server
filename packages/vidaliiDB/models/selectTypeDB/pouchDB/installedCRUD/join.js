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

const PouchDB = require('pouchdb')
const PouchDBFind = require('pouchdb-find')
// PouchDB.plugin(PouchDBFind);
module.exports = ({ dataBase, schemaTools, schemaValidator }) => async (queryMango) => {
    PouchDB.plugin(PouchDBFind)
    let query = queryMango === null ? { selector: { _id: { $gte: null } } } : queryMango
    try {
        var response = await dataBase.find(query)
        // var response = await dataBase.allDocs({
        //     include_docs: true,
        //     attachments: true
        // });
        // // db.find({
        // //     selector: { _id: 'dk' },
        // //     sort: ['_id']
        // // });
        // console.log('response.docs::', response.docs)
        return response.docs
    } catch (err) {
        console.log(err);
        return err
    }
}