
export default ({ config, db }) => {
    var encode = require('encoding-down')
    var lexint = require('lexicographic-integer');
    const encodingdb = ({ config }) => {
        if (config.env.hasOwnProperty('encoding')) {
            const { value = 'json', key = null } = config.env.encoding

            return {
                // ...(value === null ? {} : { valueEncoding: value }),
                valueEncoding: value,
                ...(key === null ? {} : { keyEncoding: key })
            }
        } else {
            //values defaults are utf8
            return {
                valueEncoding: 'json'
            }
        }
    }

    var encoding = encodingdb({ config })
    // console.log(db)
    return {
        docs: encode(db.docs, encoding),
        rev: encode(db.rev, {
            keyEncoding: {
                type: 'revision',
                encode: ({ _id, _rev }) => {
                    var toEncode = _id + '!' + lexint.pack(_rev, 'hex')
                    console.log('encode:', toEncode)
                    return toEncode
                },
                decode: (n) => {
                    console.log('decode:', n)
                    var toDecode = n.split('!');
                    return {
                        _id: toDecode[0],
                        _rev: lexint.unpack(toDecode[1])
                    }
                },
                buffer: false
            },
            valueEncoding: 'json'
        }),
        seq: encode(db.seq, {
            keyEncoding: {
                type: 'lexicographic-integer',
                encode: (n) => {
                    console.log('encoder::', n)
                    return lexint.pack(n, 'hex')
                },
                decode: (n) => {
                    console.log('decoder:', n)
                    return lexint.unpack(n)
                },
                buffer: false
            },
            valueEncoding: 'json'
        })
    }
}