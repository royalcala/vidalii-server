const { string, int, custom } = require('@vidalii/db/valuesTypes')
module.exports = {
    schema: {
        username: string,
        password: string
    },
    database: {
        db: 'users',
        url: 'http://localhost:4000',
        username: '',
        password: '',
        typeDB: 'pouchdb'
    }
}