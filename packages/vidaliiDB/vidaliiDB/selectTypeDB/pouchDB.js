const R = require('ramda')
const PouchDB = require('pouchdb');
const uuidv4 = require('uuid/v4')
const validator = require('@vidalii/db/validatorSchema')
const updateDoc = require('@vidalii/db/updateDoc')

const crud = ({ typeDB, schemaValidator, url, db, username, password }) => {
    // try {
    //     var result =  db.info();
    //   } catch (err) {
    //     console.log(err);
    //   }
    var dataBase = new PouchDB(`${url}/${db}`);
    // dataBase.login(username, password).then(function () {
    //     localDb.sync(remoteDb, { live: true, retry: true, /* other sync options */ });
    // });

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
    }
}
const pouchDB = [
    ({ typeDB }) => R.equals('pouchDB'),
    crud
]

module.exports = pouchDB