var lexint = require('lexicographic-integer');

export default ({ encoder }) => encoder.set({
    keyEncoding: {
        encode: ({ _id, _rev }) => {
            var toEncode = _id + '!' + lexint.pack(_rev, 'hex')
            // console.log('encode:', toEncode)
            return toEncode
        },
        decode: (n) => {
            // console.log('decode:', n)
            var toDecode = n.split('!');
            return {
                _id: toDecode[0],
                _rev: lexint.unpack(toDecode[1])
            }
        },
    },
    valueEncoding: encoder.codec.json
});