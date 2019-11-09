var encode = require('encoding-down')
var lexint = require('lexicographic-integer');

export default ({ db }) => encode(db.docs, {
    //default utf8
    // keyEncoding: {
    //     type: 'revision',
    //     encode: ({ _id, _rev }) => {
    //         var toEncode = _id + '!' + lexint.pack(_rev, 'hex')
    //         // console.log('encode:', toEncode)
    //         return toEncode
    //     },
    //     decode: (n) => {
    //         // console.log('decode:', n)
    //         var toDecode = n.split('!');
    //         return {
    //             _id: toDecode[0],
    //             _rev: lexint.unpack(toDecode[1])
    //         }
    //     },
    //     buffer: false
    // },
    valueEncoding: 'json'
})