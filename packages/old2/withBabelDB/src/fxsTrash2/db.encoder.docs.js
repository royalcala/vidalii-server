var lexint = require('lexicographic-integer')

export default ({ parent: { config }, db_encoder, db_encoder_many }) =>
    db_encoder({
        // keyEncoding: {
        //     encode: (key) => {
        //         // var toEncode = config.uuid + '!' + lexint.pack(_seq, 'hex')

        //         return key
        //     },
        //     decode: (key) => {
        //         var toDecode = key.split('!')
        //         return {
        //             _idServer: toDecode[0],
        //             _seq: lexint.unpack(toDecode[1])
        //         }
        //     }
        // },
        valueEncoding: db_encoder_many.json
    })