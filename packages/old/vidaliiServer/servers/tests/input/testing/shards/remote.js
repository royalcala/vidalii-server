const { url } = require('../../../serversConfig')
module.exports = ({ typesDB }) => {
    return {
        url: url.remote,
        cond: ({ newDoc }) => newDoc.branch === 'remote' ? true : false,
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