module.exports = {
    schema: {
        username: () => ''
    },
    database: {
        db: 'users',
        url: 'http://localhost:4000',
        username: '',
        password: '',
        type: 'pouchdb'
    }
}