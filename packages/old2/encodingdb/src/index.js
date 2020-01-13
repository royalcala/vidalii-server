// import { curry } from 'ramda'
import getDefaultsCodecs from './defaultCodecs'
import conditionalQuery from './conditionalQuery'

const main = (codec = {}) => db => {
    const { keyEncoding, valueEncoding } = getDefaultsCodecs(codec)
    return {
        ...db,
        composition: {
            ...db.composition,
            encodingdb: true
        },
        put: async (key, value, options = {}) => db.put(
            keyEncoding.encode(key),
            valueEncoding.encode(value),
            options),
        get: async (key, options = {}) => {
            const { encode = true } = options
            if (encode) {
                let response = await db.get(
                    keyEncoding.encode(key),
                    options
                )
                return {
                    ...response,
                    data: valueEncoding.decode(response.data)
                }
            }
            else {
                return db.get(
                    keyEncoding.encode(key),
                    options
                )
            }
        },
        batch: (ops, options = {}) => {
            // console.log('hi in encodingdb->batch')
            let opsWithKeyPrefix = ops.map(
                ({ type, key, value, ...other }) => ({
                    type,
                    key: keyEncoding.encode(key),
                    value: valueEncoding.encode(value),
                    ...other
                })
            )
            // console.log('opsWithKeyPrefix::', opsWithKeyPrefix)
            return db.batch(opsWithKeyPrefix, options)
        },
        preBatch: (ops, options = {}) => {
            let opsWithKeyPrefix = ops.map(
                ({ type, key, value, ...other }) => ({
                    type,
                    key: keyEncoding.encode(key),
                    value: valueEncoding.encode(value),
                    encodingdb: true,
                    ...other
                })
            )
            return db.hasOwnProperty('preBatch') ?
                db.preBatch(opsWithKeyPrefix) : opsWithKeyPrefix
        },
        del: (key, options = {}) => db.del(
            keyEncoding.encode(key),
            options
        ),
        createReadStreamP: (options = {}) => conditionalQuery({
            dbWithReaderP: db.createReadStreamP,
            options,
            keyEncoding,
            valueEncoding
        }),
        iteratorP: (options = {}) => conditionalQuery({
            dbWithReaderP: db.iteratorP,
            options,
            keyEncoding,
            valueEncoding
        })
    }
}

export default main