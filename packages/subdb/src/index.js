import { evolve, anyPass, has, pipe, ifElse, equals } from 'ramda'

const defaultOptionsQuery = ({ options, prefixConcat }) => pipe(
    ifElse(
        anyPass([
            has('gt'),
            has('gte')
        ]),
        opt => opt,
        opt => ({ //defautl if doesnt have, for get only his own fragment of docs
            ...opt,
            gte: '',//with the evolve(transformations) will add the prefix
        })
    ),
    ifElse(
        anyPass([
            has('lt'),
            has('lte')
        ]),
        opt => opt,
        opt => ({ //defautl if doesnt have
            ...opt,
            //         let s = '\xff' // \x hexadecimal ff last number
            // console.log('s::',s)
            lte: '\xff',
        })
    ),
    evolve({
        gt: prefixConcat,
        gte: prefixConcat,
        lt: prefixConcat,
        lte: prefixConcat,
    })
)(options)

const main = ({ prefix, separator = '!!' }) => db => {
    const prefixConcat = key => prefix.concat(separator, key)

    return {
        ...db,
        subdb: true,
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
        batch: (ops, options = {}) => {
            let opsWithKeyPrefix = ops.map(
                ({ type, key, value }) => ({
                    type,
                    key: prefixConcat(key),
                    value
                })
            )
            db.batch(opsWithKeyPrefix, options, (error) => {
                if (error)
                    reject({ error })
                else
                    resolve({ error: null })
            })
        },
        subPreBatch: ops => {
            let opsWithKeyPrefix = ops.map(
                ({ type, key, value }) => ({
                    type,
                    key: prefixConcat(key),
                    value
                })
            )
            return opsWithKeyPrefix
        },
        createReadStreamP: (options = {}) => db.createReadStreamP(
            defaultOptionsQuery({ options, prefixConcat })
        ),
        iteratorP: (options = {}) => db.iteratorP(
            defaultOptionsQuery({ options, prefixConcat })
        )
    }
}

export default main