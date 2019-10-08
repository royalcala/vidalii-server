const R = require('ramda')
const PouchDB = require('pouchdb')
const PouchDBFind = require('pouchdb-find')
// PouchDB.plugin(PouchDBFind);
// module.exports = ({ dataBase, schemaTools, schemaValidator }) => async (queryMango) => {

module.exports = ({ db }) => async (data = {}, opt = {}) => {
    PouchDB.plugin(PouchDBFind)
    try {
        // let query = queryMango === null ? { selector: { _id: { $gte: null } } } : queryMango
        // let query = R.cond([
        //     [R.has('query'), () => data.query]
        // ])(data)
        // let response = await db.find(query)
        // console.log('data:::::', data)
        let response = await R.cond([
            [R.has('selector'), () => db.find(data)],
            [R.T, () => db.find({ selector: { _id: { $gte: null } } })]
        ])(data)
        return response.docs
    } catch (err) {
        console.log(err)
        return err
    }
}
// module.exports = (crudPlugins) => async (queryMango) => {
//     PouchDB.plugin(PouchDBFind)
//     const { db } = crudPlugins
//     let query = queryMango === null ? { selector: { _id: { $gte: null } } } : queryMango
//     try {
//         var response = await db.find(query)
//         // var response = await dataBase.allDocs({
//         //     include_docs: true,
//         //     attachments: true
//         // });
//         // // db.find({
//         // //     selector: { _id: 'dk' },
//         // //     sort: ['_id']
//         // // });
//         // console.log('response.docs::', response.docs)
//         return response.docs
//     } catch (err) {
//         console.log(err);
//         return err
//     }
// }