const { string, int, custom } = require('@vidalii/db/schemas/valuesSchemaTypes')
module.exports = {
    schema: {
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