module.exports = ({ typesDB }) => {
    return {
        url: 'http://admin:admin@localhost:4000',
        // shard: {
        //     cond: '*fx(doc)=>R.T that returns true',
        // },
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