const { string, ID, ref } = require('@vidalii/db/schemas/valuesTypes')
module.exports = {
    schema: {
        _id: ID,
        _id_user: ID,
        user: ref('_id_user', 'users', '_id'),
        clientname: string,
        arreglo: [{
            _id: ID,
            hi: [{
                _id: ID,
                subHi: string
            }]
        }]
    },
    database: {
        db: 'sales',
        url: 'http://admin:admin@localhost:4000',
        username: '',
        password: '',
        typeDB: 'pouchdb'
    }
}