// const { ID, rev, string, json, enums } = require('@vidalii/db/schemas/valuesTypes')
module.exports = ({ schema_types }) => {
    const { ID, rev, enums, json, string, } = schema_types
    return {
        //_id, _rev. Are added in automatic by schema_withID
        // _id: ID,
        // _rev: rev,
        arre: [{ arra: string, arrb: string }],
        idTransaction: ID,
        branch: string,
        msg: string
    }

}
