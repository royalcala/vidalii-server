const { string, int, custom } = require('@vidalii/db/valuesSchemaTypes')
module.exports = {
    schema: {
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