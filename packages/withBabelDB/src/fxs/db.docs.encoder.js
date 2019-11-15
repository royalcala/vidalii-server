var lexint = require('lexicographic-integer');

export default ({ encoder }) => encoder.set({   
    keyEncoding: {
        // encode: (key) => {
        //     // var toEncode = config.uuid + '!' + lexint.pack(_seq, 'hex')

        //     return key
        // },
        decode: (key) => {
            var toDecode = key.split('!')
            return {
                _idServer: toDecode[0],
                _seq: lexint.unpack(toDecode[1])
            }
        }
    },
    valueEncoding: encoder.codec.json
})