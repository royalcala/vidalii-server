
export default ({ encoded_db }) => {
    // console.log(encoded_db)
    var levelup = require('levelup')
    return {
        docs: levelup(encoded_db.docs),
        rev: levelup(encoded_db.rev),
        seq: levelup(encoded_db.seq)
    }

}