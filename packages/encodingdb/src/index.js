// import { curry } from 'ramda'
import getDefaultsCodecs from './defaultCodecs'
import conditionalQuery from './conditionalQuery'



const main = (codec = {}) => db => {
    const { keyEncoding, valueEncoding } = getDefaultsCodecs(codec)
    return {
        ...db,
        encodingdb: true,
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