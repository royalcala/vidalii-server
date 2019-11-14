import { mergeDeepRight, evolve } from 'ramda'
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
export default () => (schema = {}) => {

    var schemaWithDefaults = mergeDeepRight(defaultEncoderBuffer, schema)

    var result = evolve(transformations, schemaWithDefaults)

    return result
}