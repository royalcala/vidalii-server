import { evolve, mergeDeepRight, pipe } from 'ramda'
const tryAndCatch = (typeEncoding, typeCode) => fxEncoding => dataToProcess => {
    try {
        var result = fxEncoding(dataToProcess)
        return result
    } catch (e) {
        var msg = `Error in codecs:${typeEncoding}.${typeCode}, not match the structure defined.`
        return {
            data: dataToProcess,
            error: {
                msg
            }
        }
    }
}
const addTryAndCatch = evolve(
    {
        keyEncoding: {
            encode: tryAndCatch('key', 'encode'),
            decode: tryAndCatch('key', 'decode')
        },
        valueEncoding: {
            encode: tryAndCatch('value', 'encode'),
            decode: tryAndCatch('value', 'decode')
        }
    }
)
const mergeWithDefaults = mergeDeepRight({
    keyEncoding: {
        encode: data => data,
        decode: data => data
    },
    valueEncoding: {
        encode: data => data,
        decode: data => data
    }
})

const getDefaultsCodecs = codec => pipe(
    mergeWithDefaults,
    addTryAndCatch
)(codec)


export default getDefaultsCodecs
