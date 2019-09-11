const { string, int, custom, ID } = require('@vidalii/db/schemas/valuesSchemaTypes')
module.exports = {
    schema: {
        _id: ID,
        username: string,
        password: string
    },
    database: {
        db: 'users',
        url: 'http://admin:admin@localhost:5984',
        username: '',
        password: '',
        typeDB: 'pouchdb'
    }
}