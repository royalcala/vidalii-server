import { toEncodeRev } from '../subdbs/revCodecs'
import { getAuto_id, getAuto_rev_id } from '../uuids'
import batch from './batch'
export default async (value, { config, subdb }) => {

    let _id = getAuto_id()
    let _rev_num = 1
    let _rev_id = getAuto_rev_id()
    let encodedRev = toEncodeRev({ _rev_num, _rev_id })
    // try {
    let response = await batch({
        subdb,
        config,
        keyRev: { _id, encodedRev },
        valueRev: value
    })
    if (response.error === null)
        return {
            ...response,
            versioningdb: {
                key: {
                    _id,
                    _rev: encodedRev
                }
            }
        }
    else
        return response
    // console.log('response::', response)
    // const seqPrefix = subdb.seq.subPrefixConcat
    // let responseBatch = await subdb.rev.batch([
    //     { type: 'put', key: { _id, encodedRev }, value },
    //     {
    //         customSubdb: seqPrefix, type: 'put',
    //         key: { _id_db: config._id_db, _seq: config.seq.insertAndInc() },
    //         value
    //     }
    // ])
    // return {
    //     _id,
    //     _rev: encodedRev
    // }
    // } catch (error) {
    //     return error
    // }
}