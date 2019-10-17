const extendCRUD = require('./extendCRUD')
const getCondShards = require('./getCondShards')

module.exports = ({ db, db_models }) => {
    let condShards = getCondShards({ db, db_models })
    // console.log('condShards::', condShards)
    let result = extendCRUD({ condShards })

    return result
}