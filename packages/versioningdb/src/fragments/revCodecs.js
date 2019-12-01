import { json as jsoncodecs } from '@vidalii/encodingdb/lib/codecs'
var lexint = require('lexicographic-integer');
const revCodec = {
    keyEncoding: {
        encode: ({ _id, _rev, _rev_id }) => {
            var toEncode = _id + '!!' + lexint.pack(_rev, 'hex') + '!!' + _rev_id
            // console.log('rev Encoded::', toEncode)
            return toEncode
        },
        decode: buff => {
            var toDecode = buff.toString('utf8').split('!!')
            return {
                _id: toDecode[0],
                _rev: lexint.unpack(toDecode[1]),
                _rev_id: toDecode[2]
            }
        }
    },
    valueEncoding: jsoncodecs.valueEncoding
}

export default revCodec