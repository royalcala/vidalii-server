import { toDecodeRev } from '../subdbs/revCodecs'
import { getAutoID } from '../uuids'
import { toEncodeRev } from '../subdbs/revCodecs'

export default async (data, { subdb, get }) => {
    try {
        let response = await get(data._id)
        if (response._rev === data._rev) {
            let { _id, _rev, ...value } = data
            let { _rev_num } = toDecodeRev(_rev)
            _rev_num++
            let _rev_id = getAutoID()
            let encodedRev = toEncodeRev({ _rev_num, _rev_id })
            let response = await subdb.rev.put({
                _id,
                encodedRev
            }, value)
            return {
                _id,
                _rev: encodedRev
            }
        } else {
            return {
                error: {
                    msg: `Your _rev:${data._rev} is not the latest revision of the Document`
                }
            }
        }
    } catch (error) {
        return error
    }


}