const { jsonstring, ID, ref, rev, string, json } = require('@vidalii/db/schemas/valuesTypes')
module.exports = {
    schema: {
        _id: ID,
        _rev: rev,
        idTransaction: ID,
        model: {
            schemaName: string,
        },
        data: {
            prev: json,
            new: json
        },
        time: {
            created: string
        }
    },
    database: {
        // db: 'sales', is the name of the schema
        url: 'http://admin:admin@localhost:4000',
        username: '',
        password: '',
        typeDB: 'pouchdb'
    }
}