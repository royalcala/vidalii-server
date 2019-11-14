import { evol } from '@vidalii/evol'
import { omit } from 'ramda'
var lexint = require('lexicographic-integer')
// const encoder = ({ globalData }) => ({
//     keyEncoding: {
//         encode: ({ _seq }) => {
//             var toEncode = globalData.config.uuid + '!' + lexint.pack(_seq, 'hex')
//             return toEncode
//         },
//         decode: (key) => {
//             var toDecode = key.split('!')
//             return {
//                 _idServer: toDecode[0],
//                 _seq: lexint.unpack(toDecode[1])
//             }
//         }
//     }
// })
const encoder = ({ parent: { config } }) => ({
    keyEncoding: {
        encode: ({ _seq }) => {
            var toEncode = config.uuid + '!' + lexint.pack(_seq, 'hex')
            return toEncode
        },
        decode: (key) => {
            var toDecode = key.split('!')
            return {
                _idServer: toDecode[0],
                _seq: lexint.unpack(toDecode[1])
            }
        }
    }
})

const tableName = () => 'seq'
export default evol(
    ['encoder', encoder],
    ['tableName', tableName]
)(
    omit(['parent'])
)