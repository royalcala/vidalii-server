module.exports = ({ typesDB }) => {
    return {
        url: 'http://admin:admin@localhost:5984',
        cond: ({ doc }) => doc.remote === true ? true : false,
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