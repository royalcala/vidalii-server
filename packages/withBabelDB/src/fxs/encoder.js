import { mergeDeepRight, evolve } from 'ramda'
const codecs = {
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
const addTryAndCatch = fxEncoding => dataToEncoding => {
    try {
        var result = fxEncoding(dataToEncoding)
        return result
    } catch (e) {
        console.log('Error encoding:')
        return dataToEncoding
    }
}

const transformations = {
    keyEncoding: {
        encode: addTryAndCatch,
        decode: addTryAndCatch
    },
    valueEncoding: {
        encode: addTryAndCatch,
        decode: addTryAndCatch
    }
}

const defaultEncoderBuffer = {
    keyEncoding: {
        encode: a => a,
        decode: a => a
    },
    valueEncoding: {
        encode: a => a,
        decode: a => a
    }
}
export default () => ({
    codec: codecs,
    set: (custom = {}) => {
        let schemaWithDefaults = mergeDeepRight(defaultEncoderBuffer, custom)
        return evolve(transformations, schemaWithDefaults)

    }
})
