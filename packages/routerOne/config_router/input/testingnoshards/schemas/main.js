// const { ID, rev, string, json, enums } = require('@vidalii/db/schemas/valuesTypes')
module.exports = ({ schema_types }) => {
    const { ID, rev, enums, json, string, } = schema_types
    return {
        _id: ID,
        _rev: rev,
        idTransaction: ID,
        branch: string,
        msg: string
    }

}
