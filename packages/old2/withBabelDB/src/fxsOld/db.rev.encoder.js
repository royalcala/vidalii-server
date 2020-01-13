var lexint = require('lexicographic-integer');
// const uuid = require('uuid/v4')
export default ({ encoder }) => encoder.set({
    keyEncoding: {
        encode: ({ _id, _rev, _rev_id }) => {
            //_rev_id if is null is beacause you need a new inserted revision,
            //_rev_id has his own uuid its because you need to get that document

            var toEncode = _id + '!' + lexint.pack(_rev, 'hex') + '!' + _rev_id
            // console.log('rev Encoded::', toEncode)
            return toEncode
        },
        decode: (data, options = {}) => {
            const { isBuffer = true } = options
            // console.log('rev Encoded::', buff)
            // console.log('rev Encoded::', buff.toString('utf8'))
            // Buffer.isBuffer(data)
            // var toDecode = buff.toString('utf8').split('!');

            // var toDecode = Buffer.isBuffer(data) ? ///IS A HEAVY PROCESS
            //     data.toString('utf8').split('!') :
            //     data.split('!')
            var toDecode = isBuffer ?
                data.toString('utf8').split('!') :
                data.split('!')
            return {
                _id: toDecode[0],
                _rev: lexint.unpack(toDecode[1]),
                _rev_id: toDecode[2]
            }
        },
        // decodeString: (data) => {
        //     var toDecode = data.split('!');
        //     return {
        //         _id: toDecode[0],
        //         _rev: lexint.unpack(toDecode[1]),
        //         _rev_id: toDecode[2]
        //     }
        // }
    },
    valueEncoding: encoder.codec.json
});