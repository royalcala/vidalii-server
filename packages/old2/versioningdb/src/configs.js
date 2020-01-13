import { pipe, mergeDeepRight, omit, then } from 'ramda'
import { getAuto_id_db } from './uuids'
export const _ID_DB = '_id_db'


const getSeq = async (subdb, _id_db) => {
    let nextSeq = 0
    try {
        await subdb.seq.iteratorP({
            onData: ({ _seq }) => nextSeq = _seq + 1,
            reverse: true,
            values: false,
            gte: { _id_db, _seqEncoded: '\x00' },
            lte: { _id_db, _seqEncoded: '\xFF' },
            limit: 1,
        })
    } catch (error) {

    }
    return {
        actualSeq: () => nextSeq,
        insertAndInc: () => {
            nextSeq++
            return nextSeq
        }
    }
}
const get_id_db = async subdb => {
    let _id_db
    try {
        _id_db = await subdb.system.get(_ID_DB)
    } catch (error) {
        //not found
        _id_db = getAuto_id_db()
        await subdb.system.put(_ID_DB, _id_db)
    }
    return _id_db
}
const defaults = {
    maxVersions: 5,
    // nextSeq: 0
}
export default async ({ configs, subdb }) => {
    let merged = mergeDeepRight(defaults, configs)
    // let promises = await Promise.all([
    //     get_id_db(subdb),
    //     getNextSeq(subdb,configs)
    // ])
    // merged._id_db = promises[0]
    // merged.nextSeq = promises[1]
    merged._id_db = await get_id_db(subdb)
    merged.seq = await getSeq(subdb, merged._id_db)
    // console.log('merged::', merged)
    // let result = await pipe(
    //     get_id_db,
    //     getNextSeq,
    //     then(
    //         omit(['subdb'])
    //     )
    // )({ ...merged, subdb })
    return merged
}