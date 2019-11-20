export default (nameDB) => ({ db, responses }) => async (key, options = {}) => {
    var myDB = db[nameDB]
    var error = null
    var data = null
    var { encoder = true, decoder = true } = options
    const { keyEncoding, valueEncoding } = myDB.encoder

    var toGetData = encoder === true ?
        {
            key: keyEncoding.encode(key)
        } : {
            key
        }

    try {
        var response = await myDB.get(toGetData.key)
        data = decoder === true ?
            valueEncoding.decode(response) : response

        // data = {
        //     key,
        //     value: decoder === true ?
        //         valueEncoding.decode(response) : response
        // }
    } catch (e) {
        //not found
        error = {
            msg: e + `.Error  ${nameDB}.get(${key})`
        }
    }    
    return responses.standard({
        error,
        data
    })


}