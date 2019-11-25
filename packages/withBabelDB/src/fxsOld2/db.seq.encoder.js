var lexint = require('lexicographic-integer');

export default ({ encoder }) => encoder.set({
    keyEncoding: {
        encode: ({ _id_table, _seq }) => {
            var toEncode = _id_table + '!' + lexint.pack(_seq, 'hex')
            return toEncode
        },
        decode: buff => {
            var toDecode = buff.toString('utf8').split('!')

            return {
                _id_table: toDecode[0],
                _seq: lexint.unpack(toDecode[1])
            }
        }
    },
    valueEncoding: encoder.codec.json
})