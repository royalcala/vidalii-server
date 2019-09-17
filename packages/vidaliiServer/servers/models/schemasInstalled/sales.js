const { string, ID, ref } = require('@vidalii/db/schemas/valuesTypes')
module.exports = {
    schema: {
        _id: ID,
        id_client: ID,
        client: ref('id_client', 'clients', '_id'),
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
        // db: 'sales', is the name of the schema
        url: 'http://admin:admin@localhost:4000',
        username: '',
        password: '',
        typeDB: 'pouchdb'
    }
}