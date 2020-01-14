import { toEncodeRev } from './subdbs/revCodecs'
import { has } from 'ramda'
export default ({ rev }) => async _id => {
    _id = typeof _id === 'string' ? _id : _id._id
    let lastRev = null
    await rev.iteratorP({
        onData: x => lastRev = x,
        reverse: true,
        // gte: { _id, encodedRev: '\x00' },
        gte: { _id, encodedRev: '' },
        lte: { _id, encodedRev: '\xFF' },
        limit: 1,

    })
    if (lastRev !== null) {
        const { _id, _rev_num, _rev_id } = lastRev.key
        return {
            _id,
            _rev: toEncodeRev({ _rev_num, _rev_id }),
            ...lastRev.value
        }
    }
    else
        return {
            error: {
                msg: `Not Found _id:${_id}`
            }
        }
}