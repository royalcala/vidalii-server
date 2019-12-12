const extendCRUD = require('./extendCRUD')
// const getCondShards = require('./getCondShards')

module.exports = ({ schemaTypes, schemaEvals, db_models_shards, schemas }) => {
    // let condShards = getCondShards({ db, db_models })
    // console.log('condShards::', condShards)
    let result = extendCRUD({
        schemaTypes,
        schemaEvals,
        db_models_shards,
        schemas
    })

    return result
}