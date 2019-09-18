const { string, int, custom, ID, rev } = require('@vidalii/db/schemas/valuesTypes')
module.exports = {
    schema: {
        _id: ID,
        _rev: rev,
        name: string,
        address: string
    },
    database: {
        // db: 'users', is the name of the schema
        url: 'http://admin:admin@localhost:5984',
        username: '',
        password: '',
        typeDB: 'pouchdb'
    }
}