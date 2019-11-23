var lexint = require('lexicographic-integer');

export default ({ encoder }) => encoder.set({
    keyEncoding: {
        // encode: n => n,
        // encode: (key) => {
        //     // var toEncode = config._id_table + '!' + lexint.pack(_seq, 'hex')

        //     return key
        // },
        decode: encoder.codec.utf8.decode
    },
    valueEncoding: encoder.codec.json
})