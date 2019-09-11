const { string, ID, ref } = require('@vidalii/db/schemas/valuesSchemaTypes')
module.exports = {
    schema: {
        _id: ID,
        _id_user: ID,
        user: ref('_id_user', 'users', '_id'),
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