export default (nameDB) => ({ db, responses }) => async (key, options = {}) => {
    var myDB = db[nameDB]
    var error = null
    var data = null
    var { encoder = true } = options
    const { keyEncoding, valueEncoding } = myDB.encoder
    var toDeleteData = encoder === true ?
        {
            key: keyEncoding.encode(key)
        } : {
            key
        }
    try {
        var response = await myDB.del(toDeleteData.key)
        data = 'deleted'
    } catch (e) {
        error = {
            msg: e + `.Error deleting a data on ${nameDB}.del(${key}) or not found `
        }
    }
    return responses.standard({
        error,
        data
    })
}