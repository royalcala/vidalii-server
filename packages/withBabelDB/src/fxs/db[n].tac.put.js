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
// }
// const initDefaultOptions = ({ options }) => {
//     var defaults = {
//         encoder: true
//     }
//     return mergeDeepRight(defaults, options)
// }
export default (nameDB) => ({ db, responses }) => async (key, value, options = {}) => {
    var myDB = db[nameDB]
    const { keyEncoding, valueEncoding } = myDB.encoder
    var error = null
    var data = null
    try {
        var response = await myDB.put(
            keyEncoding.encode(key),
            valueEncoding.encode(value),
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