import { assoc } from 'ramda'
var levelup = require('levelup')

export default (tableName) => ({ db }) => {
    // return {
    //     docs: levelup(db.docs),
    //     rev: levelup(db.rev),
    //     seq: levelup(db.seq)
    // }
    // return Object.entries(db).reduce(
    //     (acc, [name, value]) => assoc(name, levelup(value), acc),
    //     db
    // )
    return levelup(db[tableName])

}