var levelup = require('levelup')

export default ({ db }) => {
    // console.log('db::', db)
    //missing apply to all databases dynamicaly
    return {
        docs: levelup(db.docs),
        rev: levelup(db.rev),
        seq: levelup(db.seq)
    }

}