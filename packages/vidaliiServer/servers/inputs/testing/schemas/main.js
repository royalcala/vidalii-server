// const { ID, rev, string, json, enums } = require('@vidalii/db/schemas/valuesTypes')
module.exports = ({ types }) => {
    const { ID, rev, enums, json, string, } = types
    return {
        _id: ID,
        _rev: rev,
        idTransaction: ID,
        typeShard: string,
        branch: string,
    }

}
