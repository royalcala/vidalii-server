import { json as jsoncodecs } from '@vidalii/encodingdb/lib/codecs'
let lexint = require('lexicographic-integer');

export const toEncodeRev = ({ _rev_num, _rev_id }) => {
    return lexint.pack(_rev_num, 'hex') + '!!' + _rev_id
}
export const toDecodeRev = revEncoded => {    
    let [_rev_num, _rev_id] = revEncoded.toString('utf8').split('!!')
    return {
        _rev_num: lexint.unpack(_rev_num),
        _rev_id
    }
}

const revCodec = {
    keyEncoding: {
        encode: ({ _id = null, _rev_num = null, _rev_id = null, encodedRev = null }) => {
            let ID = _id + '!!'
            if (encodedRev !== null)
                return ID.concat(encodedRev)
            else
                return ID.concat(toEncodeRev({ _rev_num, _rev_id }))
        },
        decode: (buff) => {
            let [_id, _rev_num, _rev_id] = buff.toString('utf8').split('!!')
            return {
                _id,
                _rev_num: lexint.unpack(_rev_num),
                _rev_id
            }
        }
    },
    valueEncoding: jsoncodecs.valueEncoding
}

export default revCodec