import { mergeDeepRight, evolve } from 'ramda'
const codecs = {
    utf8: {
        encode: String,
        decode: buff => buff.toString('utf8')
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
const addTryAndCatch = (typeEncoding, typeCode) => fxEncoding => dataToEncoding => {
    try {
        var result = fxEncoding(dataToEncoding)
        return result
    } catch (e) {
        var msg = `Error ${typeEncoding}Encoding.${typeCode}, not match the structure defined.`
        // console.log(msg)
        return {
            data: dataToEncoding,
            error: {
                msg
            }
        }
    }
}

const transformations = {
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
        return evolve(transformations, schemaWithDefaults)

    }
})
