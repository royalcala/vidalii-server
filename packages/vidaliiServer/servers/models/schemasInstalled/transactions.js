const { ID, rev, string, json, enums } = require('@vidalii/db/schemas/valuesTypes')
module.exports = {
    schema: {
        _id: ID,
        _rev: rev,
        idTransaction: ID,
        process: {
            state: enums(['queued', 'rollbacked', 'commited', 'error']),
            lastProcess: string,
            response: json,
        },
        model: {
            _id: ID,
            schemaName: string,
            data: {
                prev: json,
                new: json
            },
        }
    },
    database: {
        url: 'http://admin:admin@localhost:4000',
        username: '',
        password: '',
        typeDB: 'pouchdb'
    }
}
