import { toEncodeRev } from '../subdbs/revCodecs'
import { getAutoID } from '../uuids'
export default async (value, { subdb }) => {
    let _id = getAutoID()
    let _rev_num = 1
    let _rev_id = getAutoID()
    let encodedRev = toEncodeRev({ _rev_num, _rev_id })
    try {
        let response = await subdb.rev.put({ _id, encodedRev }, value)
        return {
            _id,
            _rev: encodedRev
        }
    } catch (error) {
        return error
    }

}