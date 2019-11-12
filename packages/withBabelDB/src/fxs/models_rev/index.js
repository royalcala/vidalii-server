import { evol } from '@vidalii/evol'
// import { compose, then } from 'ramda'
var lexint = require('lexicographic-integer')

const encoder = ({ globalData }) => ({
    keyEncoding: {
        encode: ({ _seq }) => {
            var toEncode = globalData.config.uuid + '!' + lexint.pack(_seq, 'hex')
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

const getLastSeq = ({ globalData, encoder }) => () => new Promise((resolve, reject) => {
    var store = 0
    // console.log('data::', globalData)
    // var search = {
    //     lt: { _seq: 999999999 },
    //     limit: 1,
    //     reverse: true
    // }
    var search = {
        gt: globalData.config.uuid,
        lt: globalData.config.uuid + '\xff',
        limit: 1,
        reverse: true
    }
    globalData.table.seq.createKeyStream(search)
        // .on('data', function ({ _idDB, _seq }) {
        .on('data', function (key) {
            // console.log('key:', key)
            // console.log('decode:', encoder.keyEncoding.decode(key))
            store = encoder.keyEncoding.decode(key)
        })
        .on('error', function (err) {
            console.log('Oh my!', err)
        })
        .on('close', function () {
            // console.log('Stream closed')
            resolve(store)
        })
        .on('end', function () {
            // console.log('Stream ended')
        })

})

const storeSeqCounter = async ({ globalData, getLastSeq }) => {
    var lastSeq = await getLastSeq()
    var store = Number(lastSeq._seq)
    return {
        decoded: {
            nextSeq: () => {
                store += 1
                return store
            }
        },
        encoded: {
            getCurrentKey: () => (globalData.config.uuid + '!' + lexint.pack(store, 'hex'))
        }
    }
}


const insertOne = ({ globalData, encoder, storeSeqCounter }) => async () => {
    var storeSeq = await storeSeqCounter
    // console.log('_seq.next()::', _seq.next())
    var nextSeq = storeSeq.decoded.nextSeq()
    var actualKey = storeSeq.encoded.getCurrentKey()
    var key = encoder.keyEncoding.encode({
        _seq: nextSeq
    })
    console.log('key::', key)

    var response = await globalData.table.seq.tac.put(key, {})
    // console.log('response:', response)
    return globalData.fxs.standarizedResponse(
        {
            error: response.error,
            data: {
                _seq: actualKey
            },
        }
    )

}

export default globalData => evol(
    ['encoder', encoder],
    ['getLastSeq', getLastSeq],
    ['storeSeqCounter', storeSeqCounter],
    ['insertOne', insertOne]
)(
    composition => ({
        insertOne: composition.insertOne
    })
)({ globalData })