var encode = require('encoding-down')
var lexint = require('lexicographic-integer');

export default ({ db, config }) => encode(db.seq, {
    // keyEncoding: {
    //     type: 'sequence',
    //     encode: ({ _seq }) => {
    //         var toEncode = config.uuid + '!' + lexint.pack(_seq, 'hex')
    //         // console.log('encode:', toEncode)
    //         return toEncode
    //     },
    //     decode: (n) => {
    //         var toDecode = n.split('!');
    //         // console.log('decode:', toDecode)
    //         return {
    //             _idDB: toDecode[0],
    //             _seq: lexint.unpack(toDecode[1])
    //         }
    //     },
    //     buffer: false
    // },
    valueEncoding: 'json'
})