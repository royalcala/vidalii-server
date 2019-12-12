const { string, int, custom, ID } = require('@vidalii/db/schemas/valuesTypes')
module.exports = {
    schema: {
        _id: ID,
        username: string,
        password: string
    },
    database: {
        // db: 'users', is the name of the schema
        url: 'http://admin:admin@localhost:5984',
        username: '',
        password: '',
        typeDB: 'pouchdb'
    },
    pre: {
        insert: ''
    },
    post: {
        insert: ''
    }
}