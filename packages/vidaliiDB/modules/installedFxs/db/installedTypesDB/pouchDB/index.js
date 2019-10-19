const R = require('ramda')
const dataBase = require('./initDatabase')
const crud = require('./readInstalled')(__dirname + '/installedCRUD')

const initCrud = ({ crud, sendToCRUDMethods }) => R.pipe(
    R.toPairs,
    R.reduce(
        (acc, [fxName, fx]) => R.assoc(fxName, fx(sendToCRUDMethods), acc),
        {}
    )
)(crud)

module.exports = ({ shardConfig, dbName, shardName }) => {

    var sendToCRUDMethods = {
        db: dataBase({
            url: shardConfig.url,
            dbName
        }),
        dbName,
        shardConfig,
        shardName
    }

    return initCrud({ crud, sendToCRUDMethods })
}


