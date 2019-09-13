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