const { string, ID } = require('@vidalii/db/schemas/valuesSchemaTypes')
module.exports = {
    schema: {
        _id: ID,
        clientname: string
    },
    database: {
        db: 'sales',
        url: 'http://admin:admin@localhost:4000',
        username: '',
        password: '',
        typeDB: 'pouchdb'
    }
}