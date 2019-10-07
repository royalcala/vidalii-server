module.exports = ({ typesDB }) => {
    return {
        url: 'http://admin:admin@localhost:4000',
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