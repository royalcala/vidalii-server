var lexint = require('lexicographic-integer');

export default ({ encoder }) => encoder.set({
    keyEncoding: {
        encode: ({ _id, _rev }) => {
            var toEncode = _id + '!' + lexint.pack(_rev, 'hex')
            // console.log('rev Encoded::', toEncode)
            return toEncode
        },
        decode: (buff) => {
            // console.log('rev Encoded::', buff)
            // console.log('rev Encoded::', buff.toString('utf8'))
            var toDecode = buff.toString('utf8').split('!');
            return {
                _id: toDecode[0],
                _rev: lexint.unpack(toDecode[1])
            }
        },
    },
    valueEncoding: encoder.codec.json
});