const { url } = require('../../../serversConfig')
module.exports = ({ typesDB }) => {
    return {
        url: url.remote,
        cond: () => true,
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