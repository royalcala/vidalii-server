import { mergeDeepRight } from 'ramda'
const initDefaultOptions = ({ options }) => {
    var defaults = {
        //from leveldown
        // fillCache: true,
        // asBuffer: true,
        //from vidalii
        encodeIn: true,
        decodeOut: true
    }
    return mergeDeepRight(defaults, options)
}
export default (nameDB) => ({ db, responses }) => async (key, options = {}) => {
    var myDB = db[nameDB]
    var defaultOptions = initDefaultOptions({ options })
    const { keyEncoding, valueEncoding } = myDB.encoder
    var error = null
    var data = null
    // var {
    //     encoderEntrie = true,//encoder entrie
    //     decoderOut = true//decoder output
    // } = options
    // const { keyEncoding, valueEncoding } = myDB.encoder

    // var toGetData = encoderEntrie === true ?
    //     {
    //         key: keyEncoding.encode(key)
    //     } : {
    //         key
    //     }

    try {
        key = defaultOptions.encodeIn ? keyEncoding.encode(key) : key
        var response = await myDB.get(key, defaultOptions)
        data = defaultOptions.decodeOut ? valueEncoding.decode(response) : response
    } catch (e) {
        //not found
        error = {
            msg: `.Error  ${nameDB}.get(${key}).` + e
        }
    }
    return responses.standard({
        error,
        data
    })


}