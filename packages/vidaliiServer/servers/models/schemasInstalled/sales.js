const { string, int, custom } = require('@vidalii/db/valuesTypes')
module.exports = {
    schema: {
        clientName: string
    },
    database: {
        db: 'sales',
        url: 'http://localhost:4000',
        username: '',
        password: '',
        typeDB: 'pouchdb'
    }
}