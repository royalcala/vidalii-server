export default (nameDB) => ({ db, fxs:{standarizedResponse} }) => async (key, value, options = {}) => {
    var myDB = db[nameDB]
    var { encoder = true } = options
    var error = null
    var data = null
    // console.log('db.encoder::',db)
    const { keyEncoding, valueEncoding } = myDB.encoder
    var toInsertData = encoder === true ?
        {
            key: keyEncoding.encode(key),
            value: valueEncoding.encode(value)
        } : {
            key, value
        }

    try {
        var response = await myDB.put(
            toInsertData.key,
            toInsertData.value
        )
        // data = 'ok'
    } catch (e) {
        error = {
            msg: e + `.Error inserting a data on ${nameDB}.put(${key},${value}) `
        }
    }
    return standarizedResponse({
        error,
        data
    })


}