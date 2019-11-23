// import { mergeDeepRight } from 'ramda'

// const decodeKey = ({ db, options, encodedKey }) => {
//     const { keyEncoding } = db.encoder
//     return options.encoder === true ?
//         {
//             key: keyEncoding.decode(encodedKey, { isBuffer: false })
//         } : {
//             key
//         }
// }
// const encodeData = ({ db, options, key, value }) => {
//     const { keyEncoding, valueEncoding } = db.encoder
//     return options.encoder === true ?
//         {
//             key: keyEncoding.encode(key),
//             value: valueEncoding.encode(value)
//         } : {
//             key, value
//         }
import { mergeDeepRight } from 'ramda'
const initDefaultOptions = ({ options }) => {
    var defaults = {
        encodeIn: {
            key: true,
            value: true
        }
    }
    return mergeDeepRight(defaults, options)
}

export default (nameDB) => ({ db, responses }) => async (key, value, options = {}) => {
    var myDB = db[nameDB]
    var defaultOptions = initDefaultOptions({ options })
    const { keyEncoding, valueEncoding } = myDB.encoder
    var error = null
    var data = null
    try {
        key = defaultOptions.encodeIn.key ? keyEncoding.encode(key) : key
        value = defaultOptions.encodeIn.value ? valueEncoding.encode(value) : value
        var response = await myDB.put(
            key,
            value,
            options
        )

    } catch (e) {
        error = {
            msg: e + `.Error inserting a data on ${nameDB}.put(${key},${value}) `
        }
    }
    return responses.standard({
        error,
        data
    })


}