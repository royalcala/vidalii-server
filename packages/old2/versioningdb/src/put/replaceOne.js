import { toDecodeRev } from '../subdbs/revCodecs'
import { getAuto_rev_id } from '../uuids'
import { toEncodeRev } from '../subdbs/revCodecs'
import batch from './batch'

export default async (data, { subdb, get, config }) => {
    try {
        let response = await get(data._id)
        if (response._rev === data._rev) {
            let { _id, _rev, ...value } = data
            let { _rev_num } = toDecodeRev(_rev)
            let encodedRev = toEncodeRev({
                _rev_num: _rev_num + 1,
                _rev_id: getAuto_rev_id()
            })
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
        } else {
            return {
                error: {
                    msg: `Your _rev:${data._rev} is not the latest revision of the Document`
                }
            }
        }
    } catch (error) {
        //id rev not found
        return error
    }


}