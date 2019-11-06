

export default ({ db_encode }) => {
    // console.log(db_encode)
    var levelup = require('levelup')
    return {
        docs: levelup(db_encode.docs),
        rev: levelup(db_encode.rev),
        seq: levelup(db_encode.seq)
    }

}