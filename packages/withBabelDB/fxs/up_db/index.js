

export default ({ db }) => {
    console.log(db)
    var levelup = require('levelup')
    return {
        docs: levelup(db.docs),
        // rev: levelup(db.rev),
        // seq: levelup(db.seq)
    }

}