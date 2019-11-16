const put = ({ db, standarizedResponse }) => async (key, value, options = {}) => {
    var { encoder = true } = options
    var error = null
    var data = null
    // console.log('db.encoder::',db)
    const { keyEncoding, valueEncoding } = db.encoder
    var toInsertData = encoder === true ?
        {
            key: keyEncoding.encode(key),
            value: valueEncoding.encode(value)
        } : {
            key, value
        }

    try {
        var response = await db.put(
            toInsertData.key,
            toInsertData.value
        )
        // data = 'ok'
    } catch (e) {
        error = {
            msg: e + `.Error inserting a data on ${nameTable}.put(${key},${value}) `
        }
    }
    return standarizedResponse({
        error,
        data
    })


}
const get = ({ db, standarizedResponse }) => async (key, options = {}) => {
    var error = null
    var data = null
    var { encoder = true, decoder = true } = options
    const { keyEncoding, valueEncoding } = db.encoder

    var toGetData = encoder === true ?
        {
            key: keyEncoding.encode(key)
        } : {
            key
        }

    try {
        var response = await db.get(toGetData.key)
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
            msg: e + `.Error  ${nameTable}.get(${key})`
        }
    }
    return standarizedResponse({
        error,
        data
    })


}
const del = ({ db, standarizedResponse }) => async (key, options = {}) => {
    var error = null
    var data = null
    var { encoder = true } = options
    const { keyEncoding, valueEncoding } = db.encoder
    var toDeleteData = encoder === true ?
        {
            key: keyEncoding.encode(key)
        } : {
            key
        }
    try {
        var response = await db.del(toDeleteData.key)
        data = 'deleted'
    } catch (e) {
        error = {
            msg: e + `.Error deleting a data on ${nameTable}.del(${key}) or not found `
        }
    }
    return standarizedResponse({
        error,
        data
    })


}
export default (n) => ({ db, fxs: { standarizedResponse } }) => {

    return {
        put: put({ db: db[n], standarizedResponse }),
        get: get({ db: db[n], standarizedResponse }),
        del: del({ db: db[n], standarizedResponse })
    }
}