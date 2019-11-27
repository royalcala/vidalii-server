import { pipe, ifElse, propEq } from 'ramda'
import subdb from '@vidalii/subdb'
import encodingdb from '@vidalii/encodingdb'
import { json as jsoncodecs } from '@vidalii/encodingdb/lib/codecs'
// const addEncapsulatedb = db => ifElse(
//     propEq('encapsulatedb', true),
//     x => x,
//     x => encapsulatedb(db)
// )(db)

const createFragments = ({ db }) => {
    const rev = pipe(
        subdb({ prefix: 'rev' }),
        encodingdb({ valueEncoding: jsoncodecs.valueEncoding })
    )(db)
    const seq = pipe(
        subdb({ prefix: 'seq' }),
        encodingdb({ valueEncoding: jsoncodecs.valueEncoding })
    )(db)
    const doc = pipe(
        subdb({ prefix: 'doc' }),
        encodingdb({ valueEncoding: jsoncodecs.valueEncoding })
    )(db)
    return {
        rev,
        seq,
        doc
    }
}
const main = ({ maxVersions = 5 }) => db => {
    // const { rev, seq, doc } = createFragments({ db })

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
}

export default main