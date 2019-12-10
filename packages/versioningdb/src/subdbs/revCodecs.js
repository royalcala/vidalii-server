import { json as jsoncodecs } from '@vidalii/encodingdb/lib/codecs'
let lexint = require('lexicographic-integer');

export const toEncodeRev = ({ _rev_num, _rev_id }) => {
    return lexint.pack(_rev_num, 'hex') + '!!' + _rev_id
}

const revCodec = {
    keyEncoding: {
        encode: ({ _id = null, _rev_num = null, _rev_id = null, encodedRev = null }) => {
            // console.log('access1*-*-*-*-*', _id)
            let ID = _id + '!!'
            if (encodedRev !== null) {
                // console.log('access2',ID.concat(encodedRev))
                return ID.concat(encodedRev)
            } else {
                // console.log('access3')
                // console.log('toEncodeRev({ _rev_num, _rev_id })::', ID.concat(toEncodeRev({ _rev_num, _rev_id })))            
                return ID.concat(toEncodeRev({ _rev_num, _rev_id }))
            }
        },
        decode: buff => {
            // return buff.toString('utf8')
            let toDecode = buff.toString('utf8').split('!!')
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