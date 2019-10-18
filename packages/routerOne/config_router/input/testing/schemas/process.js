// const { ID, rev, string, json, enums } = require('@vidalii/db/schemas/valuesTypes')
module.exports = ({ schemaTypes }) => {
    const { ID, rev, enums, json, string, } = schemaTypes

    return {
        state: enums(['queued', 'rollbacked', 'commited', 'error']),
        lastProcess: string,
        response: json
    }
}
