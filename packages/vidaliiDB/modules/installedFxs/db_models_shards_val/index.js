const R = require('ramda')


const validatorSchema = () => {

}

const extendCrud = ({ db_models_shards, validation, schemas }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameDb, shardCrud]) => {
            const { updateDoc, validateDoc, pre_validate_insert } = validation
            return {
                [nameDb]: {
                    ...shardCrud,
                    insertOne: async (newDoc = {}, options = {}) => {

                        let val = validateDoc({//can be query exes into nodes
                            schemaValidator: schemas[nameDb],
                            newDoc
                        })
                        let result = await shardCrud.insertOne(newDoc, options)
                        return result
                    }
                }
            }
        }
    ),
    R.mergeAll
)(db_models_shards)


module.exports = ({ schemas, validation, db_models_shards, }) => {
    // const { updateDoc, validateDoc, pre_validate_insert } = validation
    const crud = extendCrud({ db_models_shards, validation, schemas })
    return ''
}