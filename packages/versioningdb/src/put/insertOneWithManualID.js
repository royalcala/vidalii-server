import { toEncodeRev } from '../subdbs/revCodecs'
const uuid = require('uuid/v4')
export default async (data, { subdb }) => {
    const { _id, ...value } = data
    let _rev_num = 1
    let _rev_id = uuid()
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