import { json as jsoncodecs, utf8 } from '@vidalii/encodingdb/lib/codecs'
var lexint = require('lexicographic-integer');
const codecs = {
    keyEncoding: {
        // encode use default string/buff
        decode: utf8.keyEncoding.decode
    },
    valueEncoding: jsoncodecs.valueEncoding
}

export default codecs