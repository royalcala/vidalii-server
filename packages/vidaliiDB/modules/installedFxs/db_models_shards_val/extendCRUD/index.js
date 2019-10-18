const R = require('ramda')
const uuidv4 = require('uuid/v4')
// uuidv4()
// const insertOne = require('./installed/insertOne')
// const find = require('./installed/find')


const extendCrud = ({ schemaTypes, schemaEvals, db_models_shards, schemas, transcationId = null }) => {

    return R.pipe(
        R.toPairs,
        R.map(
            ([nameDatabase, crud]) => ({
                [nameDatabase]: {
                    ...crud,
                    insertOne: async (newDoc = {}, options = {}) => {
                        let this_schema = schemas[nameDatabase]
                        //return if has some error
                        let result_resolveDoc = resolveDoc({
                            schema: this_schema,
                            newDoc,
                            models: extendCrud({
                                schemaTypes,
                                schemaEvals,
                                db_models_shards,
                                schemas,
                                transactionId: R.ifElse(
                                    R.equals(null),
                                    () => uuidv4(),
                                    id => id
                                )(transcationId)

                            })

                        })
                        // crud.insertOne
                    }
                }
            })
        ),
        R.mergeAll
    )(db_models_shards)
}
module.exports = ({ schemaTypes, schemaEvals, db_models_shards, schemas }) => {
    let extended = extendCrud({ schemaTypes, schemaEvals, db_models_shards, schemas })
    return extended
}