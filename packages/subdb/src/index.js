import { evolve, anyPass, has, pipe, ifElse, cond } from 'ramda'

const defaultOptionsQuery = ({ options, prefixConcat }) => pipe(
    ifElse(
        anyPass([
            has('gt'),
            has('gte'),
            has('start')
        ]),
        opt => opt,
        opt => ({ //defautl if doesnt have, for get only his own fragment of docs
            ...opt,
            // gte: '',//with the evolve(transformations) will add the prefix
            start: ''
        })
    ),
    ifElse(
        anyPass([
            has('lt'),
            has('lte'),
            has('end')
        ]),
        opt => opt,
        opt => ({ //defautl if doesnt have
            ...opt,
            //         let s = '\xff' // \x hexadecimal ff last number
            // console.log('s::',s)
            // lte: '\xff',
            end: '\xff',
        })
    ),
    evolve({
        gt: prefixConcat,
        gte: prefixConcat,
        start: prefixConcat,
        lt: prefixConcat,
        lte: prefixConcat,
        end: prefixConcat
    })
)(options)

const main = ({ prefix, separator = '!!' }) => db => {
    const prefixConcat = key => prefix.concat(separator, key)
    const sizePrefix = prefix.concat(separator).length
    const removePrefix = key => key.slice(sizePrefix)
    return {
        ...db,
        composition: {
            ...db.composition,
            subdb: true
        },
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
        subPrefixConcat: prefixConcat,
        batch: (ops, options = {}) => {
            let opsWithKeyPrefix = ops.map(
                ({ type, key, value, customSubdb = null }) => ({
                    type,
                    key: customSubdb !== null ? customSubdb(key) : prefixConcat(key),
                    value
                })
            )
            // console.log('opsWithKeyPrefix::', opsWithKeyPrefix)
            return db.batch(opsWithKeyPrefix, options)
        },
        preBatch: ops => {
            let opsWithKeyPrefix = ops.map(
                ({ type, key, value, customSubdb = null, ...other }) => ({
                    type,
                    key: customSubdb !== null ? customSubdb(key) : prefixConcat(key),
                    value,
                    subdb: true,
                    ...other
                })
            )
            return db.hasOwnProperty('preBatch') ?
                db.preBatch(opsWithKeyPrefix) : opsWithKeyPrefix
        },
        createReadStreamP: (options = {}) => db.createReadStreamP(
            defaultOptionsQuery({ options, prefixConcat })
        ),
        iteratorP: (options = {}) => {
            let defaults = defaultOptionsQuery({
                options: { keys: true, values: true, ...options },
                prefixConcat
            })
            if (defaults.hasOwnProperty('onData')) {
                let prevOnData = defaults.onData
                if (defaults.values === true)//only one field::isString
                    defaults.onData = data => {
                        data.key = removePrefix(data.key)
                        prevOnData(data)
                    }
                else//with both field::isObject
                    defaults.onData = key => {
                        key = removePrefix(key)
                        prevOnData(key)
                    }
            }

            return db.iteratorP(
                defaults
            )
        }
    }
}

export default main