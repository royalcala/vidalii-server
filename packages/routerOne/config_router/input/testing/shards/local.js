const { url } = require('../../../serversConfig')
module.exports = ({ typesDB }) => {
    return {
        url: url.local,
        cond: ({ newDoc }) => newDoc.branch === 'local' ? true : false,
        gql: {
            queries: {},
            mutations: {}
        },
        username: '',
        password: '',
        // typeDB: 'pouchdb'
        typeDB: typesDB.pouchDB
    }
}