const R = require('ramda')
const PouchDB = require('pouchdb')
const PouchDBFind = require('pouchdb-find')
const uuidv4 = require('uuid/v4')
const validator = require('@vidalii/db/validatorSchema')
const updateDoc = require('@vidalii/db/updateDoc')

const crud = ({ typeDB, schemaValidator, url, db, username, password }) => {

    var dataBase = new PouchDB(`${url}/${db}`);


    return {
        insert: async (newDoc) => {
            var validated = validator({ schemaValidator, newDoc })

            try {
                var response = await dataBase.put(validated);
                return response
            } catch (err) {
                console.log(err);
                return err
            }
        },
        replace: async (newDoc) => {
            var validated = validator({ schemaValidator, newDoc })

            try {
                var response = await dataBase.put(validated);
                return response
            } catch (err) {
                console.log(err);
                return err
            }
        },
        update: async (docToUpdate) => {
            //always update lasted

            try {
                var prevDoc = await dataBase.get(docToUpdate._id);
                var validated = validator({ schemaValidator, newDoc: docToUpdate, prevDoc })
                //pending merge with arrays
                var final = R.mergeDeepRight(prevDoc, validated)
                console.log(final)
                var updateResponse = await dataBase.put(final);
            } catch (err) {
                console.log('Error in method Update PouchDB:', err);
                return err
            }

            return updateResponse
        },
        find: async (queryMango) => {
            PouchDB.plugin(PouchDBFind);
            // console.log('queryMango::', queryMango)
            let query = queryMango === null ? { selector: { _id: { $gte: null } } } : queryMango
            // console.log('query::', query)
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
                console.log('response.docs::', response.docs)
                return response.docs
            } catch (err) {
                console.log(err);
                return err
            }
        }
    }
}
const pouchDB = [
    ({ typeDB }) => R.equals('pouchDB'),
    crud
]

module.exports = pouchDB