import { json as jsoncodecs } from '@vidalii/encodingdb/lib/codecs'
var lexint = require('lexicographic-integer');

const seqCodec = {
    keyEncoding: {
        encode: ({ _id_db, _seq = null, _seqEncoded = null }) => {
            let toEncode = _id_db + '!!'
            if (_seq !== null)
                toEncode = toEncode.concat(lexint.pack(_seq, 'hex'))
            else
                toEncode = toEncode.concat(_seqEncoded)

            return toEncode
        },
        decode: buff => {
            var toDecode = buff.toString('utf8').split('!!')
            return {
                _id_db: toDecode[0],
                _seq: lexint.unpack(toDecode[1])
            }
        }
    },
    valueEncoding: jsoncodecs.valueEncoding
}

export default seqCodec