// const { ID, rev, string, json, enums } = require('@vidalii/db/schemas/valuesTypes')
module.exports = ({ schemaTypes }) => {
    const { ID, rev, enums, json, string, } = schemaTypes
    return {
        _id: ID,
        _rev: rev,
        idTransaction: ID,
        branch: string,
        msg: string
    }

}
