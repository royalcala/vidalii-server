module.exports = ({ typesDB }) => {
    return [{
        url: 'http://admin:admin@localhost:4000',
        shards: {
            field: '*',
            values: '*'
        },
        username: '',
        password: '',
        // typeDB: 'pouchdb'
        typeDB: typesDB.pouchDB
    }]
}