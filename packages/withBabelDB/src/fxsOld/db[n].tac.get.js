import { mergeDeepRight } from 'ramda'
// const defaultOptions = ({ options }) => {
//     var defaults = {
//         //from leveldown
//         fillCache: true,
//         asBuffer: true,
//         //from vidalii
//         encoder: true,
//         decoder: true
//     }
//     return mergeDeepRight(defaults, options)
// }
export default (nameDB) => ({ db, responses }) => async (key, options = {}) => {
    var myDB = db[nameDB]
    var error = null
    var data = null
    var {
        encoderEntrie = true,//encoder entrie
        decoderOut = true//decoder output
    } = options
    const { keyEncoding, valueEncoding } = myDB.encoder

    var toGetData = encoderEntrie === true ?
        {
            key: keyEncoding.encode(key)
        } : {
            key
        }

    try {
        var response = await myDB.get(toGetData.key)
        data = decoderOut === true ?
            valueEncoding.decode(response) : response
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