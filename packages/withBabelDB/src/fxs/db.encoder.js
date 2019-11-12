import { mergeDeepRight } from 'ramda'

export default () => (schema = {}) => {
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
    return mergeDeepRight(defaultEncoderBuffer, schema)
}