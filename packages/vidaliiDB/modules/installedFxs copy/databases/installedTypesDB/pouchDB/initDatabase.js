const PouchDB = require('pouchdb')
const PouchDBFind = require('pouchdb-find')
// import PouchDB from 'pouchdb';
// import PouchDBFind from 'pouchdb-find';

// class PouchService {
//     constructor() {
//         PouchDB.plugin(PouchDBFind);
//     }
// }


// module.exports = PouchDB.plugin(PouchDBFind)
module.exports = ({ url, dbName }) => {
    PouchDB.plugin(PouchDBFind)
    return new PouchDB(`${url}/${dbName}`)
}