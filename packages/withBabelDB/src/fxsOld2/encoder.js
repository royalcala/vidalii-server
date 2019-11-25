import { mergeDeepRight, evolve } from 'ramda'
const codecs = {
    utf8: {
        encode: String,
        decode: buff => {

            var toDecode = buff.toString('utf8')
            return toDecode
        }
    },
    json: {
        //BOTH CASES WORKS
        //CASE1
        // encode: objectJson => Buffer.from(JSON.stringify(objectJson)),       
        // decode: buf => JSON.parse(buf.toString())
        //CASE2
        encode: JSON.stringify,
        decode: JSON.parse
    }
}

// const addValidationBuffer = tryAndCatchFx => ({ asBuffer = true }) => {
//     if (asBuffer) {

//         return buff => {

//             return tryAndCatchFx(buff.toString('utf8'))
//         }
//     } else {
//         return str => tryAndCatchFx(str)
//     }

// }

// const transformations_addValidationBuffer = {
//     keyEncoding: {
//         decode: addValidationBuffer
//     },
//     valueEncoding: {
//         decode: addValidationBuffer
//     }
// }

const addTryAndCatch = (typeEncoding, typeCode) => fxEncoding => dataToProcess => {
    try {
        var result = fxEncoding(dataToProcess)
        return result
    } catch (e) {
        var msg = `Error in codecs:${typeEncoding}.${typeCode}, not match the structure defined.`
        // console.log(msg)
        return {
            data: dataToProcess,
            error: {
                msg
            }
        }
    }
}

const transformations_addTryAndCatch = {
    keyEncoding: {
        encode: addTryAndCatch('key', 'encode'),
        decode: addTryAndCatch('key', 'decode')
    },
    valueEncoding: {
        encode: addTryAndCatch('value', 'encode'),
        decode: addTryAndCatch('value', 'decode')
    }
}

const defaultEncoderBuffer = {
    keyEncoding: {
        encode: s => s,
        decode: buff => buff
    },
    valueEncoding: {
        encode: s => s,
        decode: buff => buff
    }
}

export default () => ({
    codec: codecs,
    set: (custom = {}) => {
        let schemaWithDefaults = mergeDeepRight(defaultEncoderBuffer, custom)
        let schemaWithTryAndCatch = evolve(transformations_addTryAndCatch, schemaWithDefaults)
        return schemaWithTryAndCatch
        // let withBufferFx = evolve(transformations_addValidationBuffer, schemaWithTryAndCatch)
        // return withBufferFx
    }
})
