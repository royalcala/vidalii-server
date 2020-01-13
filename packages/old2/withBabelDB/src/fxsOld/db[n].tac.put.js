import { mergeDeepRight } from 'ramda'

const decodeKey = ({ db, options, encodedKey }) => {
    const { keyEncoding } = db.encoder
    return options.encoder === true ?
        {
            key: keyEncoding.decode(encodedKey, { isBuffer: false })
        } : {
            key
        }
}
const encodeData = ({ db, options, key, value }) => {
    const { keyEncoding, valueEncoding } = db.encoder
    return options.encoder === true ?
        {
            key: keyEncoding.encode(key),
            value: valueEncoding.encode(value)
        } : {
            key, value
        }
}
const initDefaultOptions = ({ options }) => {
    var defaults = {
        encoder: true
    }
    return mergeDeepRight(defaults, options)
}
export default (nameDB) => ({ db, responses }) => async (key, value, options = {}) => {
    var myDB = db[nameDB]
    //usend in encodeKey, and decodeKey
    // var { encoder = true } = options 
    var defaultOptions = initDefaultOptions({ options })
    var error = null
    var data = null
    // console.log('db.encoder::',db)
    // const { keyEncoding, valueEncoding } = myDB.encoder
    // var dataToInsert = encoder === true ?
    //     {
    //         key: keyEncoding.encode(key),
    //         value: valueEncoding.encode(value)
    //     } : {
    //         key, value
    //     }
    var dataToInsert = encodeData({ db: myDB, options: defaultOptions, key, value })
    try {
        var response = await myDB.put(
            dataToInsert.key,
            dataToInsert.value
        )
        // data = 'ok'
    } catch (e) {
        error = {
            msg: e + `.Error inserting a data on ${nameDB}.put(${key},${value}) `
        }
    }
    // var keyInfo = decodeKey({
    //     db: myDB, options: defaultOptions,
    //     encodedKey: dataToInsert.key
    // })
    // console.log(
    //     'decodeKey',
    //     keyInfo)

    return responses.standard({
        error,
        data,
        key: {
            ...decodeKey({
                db: myDB, options: defaultOptions,
                encodedKey: dataToInsert.key
            }).key
        }
    })


}