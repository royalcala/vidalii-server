import { curry, evolve, anyPass, has, pipe, ifElse, equals } from 'ramda'

const defaultOptionsQuery = ({ options, prefixConcat }) => pipe(
    ifElse(
        anyPass([
            has('gt'),
            has('gte'),
            has('lt'),
            has('lte')
        ]),
        opt => opt,
        opt => ({
            ...opt,
            gte: ''//with the evolve(transformations) will add the prefix
        })
    ),
    evolve({
        gt: prefixConcat,
        gte: prefixConcat,
        lt: prefixConcat,
        lte: prefixConcat,
    })
)(options)

const main = curry(({ prefix, separator = '!!' }, db) => {
    const prefixConcat = key => prefix.concat(separator, key)

    return {
        ...db,
        put: (key, value, options = {}) => db.put(
            prefixConcat(key),
            value,
            options),
        get: (key, options = {}) => db.get(
            prefixConcat(key),
            options
        ),
        del: (key, options = {}) => db.del(
            prefixConcat(key),
            options
        ),
        createReadStreamP: (options = {}) => db.createReadStreamP(
            defaultOptionsQuery({ options, prefixConcat })
        ),
        iteratorP: (options = {}) => db.iteratorP(
            defaultOptionsQuery({ options, prefixConcat })
        )
    }
})

export default main