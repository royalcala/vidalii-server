// const { ID, rev, string, json, enums } = require('@vidalii/db/schemas/valuesTypes')
module.exports = ({ schema_types }) => {
    const { ID, rev, enums, json, string, } = schema_types

    return {
        state: enums(['queued', 'rollbacked', 'commited', 'error']),
        lastProcess: string,
        response: json
    }
}
