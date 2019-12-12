import { toEncodeRev } from '../subdbs/revCodecs'
import {  getAuto_rev_id  } from '../uuids'
import batch from './batch'

export default async (data, { subdb, config }) => {
    const { _id, ...value } = data
    let _rev_num = 1
    let _rev_id = getAuto_rev_id()
    let encodedRev = toEncodeRev({ _rev_num, _rev_id })
    let response = await batch({
        subdb,
        config,
        keyRev: { _id, encodedRev },
        valueRev: value
    })
    if (response.error === null)
        return {
            ...response,
            _id,
            _rev: encodedRev
        }
    else
        return response
    // try {
    //     let response = await subdb.rev.put({ _id, encodedRev }, value)
    //     return {
    //         _id,
    //         _rev: encodedRev
    //     }
    // } catch (error) {
    //     return error
    // }

}