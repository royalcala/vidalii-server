import { pipe, ifElse, propEq } from 'ramda'
import abstractdb from '@vidalii/abstractdb'
import subdb from '@vidalii/subdb'
import encodingdb from '@vidalii/encodingdb'
const addAbstractdb = db => ifElse(
    propEq('abstractdb', true),
    x => x,
    x => abstractdb(db)
)(db)
const createFragments = ({ db }) => {
    const rev = pipe(
        subdb({ prefix: 'rev' }),
        encodingdb
    )(db)
    const seq = pipe(
        subdb({ prefix: 'seq' })
    )(db)
    const doc = pipe(
        subdb({ prefix: 'doc' })
    )(db)
    return {
        rev,
        seq,
        doc
    }
}
const main = ({ maxVersions = 5 }) => db => {
    db = addAbstractdb(db)//this can be checked on abstractdb directly
    const { rev, seq, doc } = createFragments({ db })


    //get sublevels here
    return {
        ...db,
        insertOne: (key, value) => {
            //if key has only _id that means to insert a new one
            //->check if exist, if exist send error
            //if key has rev
            //->check if is the last rev for proceed

        },
        updateOne: (key, value) => {

        }
    }
    // const { keyEncoding, valueEncoding } = getDefaultsCodecs(codec)
    // return {
    //     ...db,
    //     put: (key, value, options = {}) => db.put(
    //         keyEncoding.encode(key),
    //         valueEncoding.encode(value),
    //         options),
    //     get: async (key, options = {}) => {
    //         const { encode = true } = options
    //         if (encode) {
    //             let response = await db.get(
    //                 keyEncoding.encode(key),
    //                 options
    //             )
    //             return {
    //                 ...response,
    //                 data: valueEncoding.decode(response.data)
    //             }
    //         }
    //         else {
    //             return db.get(
    //                 keyEncoding.encode(key),
    //                 options
    //             )
    //         }
    //     },
    //     del: (key, options = {}) => db.del(
    //         keyEncoding.encode(key),
    //         options
    //     ),
    //     createReadStreamP: (options = {}) => conditionalQuery({
    //         dbWithReaderP: db.createReadStreamP,
    //         options,
    //         keyEncoding,
    //         valueEncoding
    //     }),
    //     iteratorP: (options = {}) => conditionalQuery({
    //         dbWithReaderP: db.iteratorP,
    //         options,
    //         keyEncoding,
    //         valueEncoding
    //     })
    // }
}

export default main