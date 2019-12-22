import { mergeDeepRight, evolve, pipe } from 'ramda'

export default ({ options, keyEncoding }) => pipe(
    mergeDeepRight({
        encode: true,
        keys: true,
        values: true,
        onData: data => data
    }),
    evolve({
        gt: keyEncoding.encode,
        gte: keyEncoding.encode,
        start: keyEncoding.encode,
        lt: keyEncoding.encode,
        lte: keyEncoding.encode,
        end: keyEncoding.encode,
    })
)(options)