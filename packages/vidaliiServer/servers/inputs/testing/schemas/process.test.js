// const { ID, rev, string, json, enums } = require('@vidalii/db/schemas/valuesTypes')
module.exports = ({ types }) => {
    const { ID, rev, enums, json, string, } = types

    return {
        subProcessOfProcess: ID
    }
}
