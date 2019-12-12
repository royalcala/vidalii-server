const R = require('ramda')
//extend schemas,
//add default ID if no exist {_id}
//in root, and in each array_object[_id]
const getExtendedSchema = require('./recursive')
module.exports = ({ schemas, schemaTypes }) => {
    // console.log('schemas::', Object.keys(schemas))
    const extendedSchema = R.pipe(
        R.toPairs,
        R.map(
            ([nameDb, schemaDb]) => ({
                [nameDb]: getExtendedSchema({
                    schema: schemaDb,
                    fx_id: schemaTypes.ID,
                    fx_rev: schemaTypes.rev
                })
            })
        ),
        R.mergeAll
    )(schemas)
    // console.log('schemas_withID', extendedSchema)

    return extendedSchema
}