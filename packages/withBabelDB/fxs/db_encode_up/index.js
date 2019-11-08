var levelup = require('levelup')

export default ({ db_encode }) => {
    // console.log('db_encode::', db_encode)

    return {
        docs: levelup(db_encode.docs),
        rev: levelup(db_encode.rev),
        seq: levelup(db_encode.seq)
    }

}