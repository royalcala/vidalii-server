import { json as jsoncodecs } from '@vidalii/encodingdb/lib/codecs'
let lexint = require('lexicographic-integer');

export const toEncodeRev = ({ _rev_num, _rev_id }) => {
    return lexint.pack(_rev_num, 'hex') + '!!' + _rev_id
}


const revCodec = {
    keyEncoding: {
        encode: ({ _id = null, _rev_num = null, _rev_id = null, encodedRev = null }) => {
            let id = _id + '!!'
            if (encodedRev !== null) {
                return id + encodedRev
            } else {
                return id + toEncodeKey({ _rev_num, _rev_id })
            }
        },
        decode: buff => {
            var toDecode = buff.toString('utf8').split('!!')
            return {
                _id: toDecode[0],
                _rev_num: lexint.unpack(toDecode[1]),
                _rev_id: toDecode[2]
            }
        }
    },
    valueEncoding: jsoncodecs.valueEncoding
}

export default revCodec