import { mergeDeepRight } from 'ramda'
const initDefaultOptions = ({ options }) => {
    var defaults = {
        //from leveldown
        // fillCache: true,
        // asBuffer: true,
        //from vidalii
        encodeIn: true,
        // decodeOut: true
    }
    return mergeDeepRight(defaults, options)
}
export default (nameDB) => ({ db, responses }) => async (key, options = {}) => {
    var myDB = db[nameDB]
    var error = null
    var data = null
    // var { encoder = true } = options
    const { keyEncoding, valueEncoding } = myDB.encoder
    // var toDeleteData = encoder === true ?
    //     {
    //         key: keyEncoding.encode(key)
    //     } : {
    //         key
    //     }
    try {
        key = defaultOptions.encodeIn ? keyEncoding.encode(key) : key
        var response = await myDB.del(key, options)
        // data = 'deleted'
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