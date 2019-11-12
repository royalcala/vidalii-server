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
// var s = []
// var store = (key) => s.push(key)

const queryServer = ({ globalData }) => ({
    query,
    encoder = true,
    onData,
    onError = () => { },
    onClose = () => { },
    onEnd = () => { }
}) => new Promise((resolve, reject) => {

    //the values of keys, and values can be change inside the query parameter
    var keys = true
    var values = true
    // var store = []
    // var search = {
    //     gt: globalData.config.uuid,
    //     lt: globalData.config.uuid + '\xff',
    //     limit: 1,
    //     reverse: true
    // }
    console.log('queryServer running:', { keys, values, ...query })
    globalData.table.seq.createReadStream({ keys, values, ...query })
        .on('data', d => {
            console.log('data-->', d)
            console.log(onData)
            onData(d)
        })
        .on('error', onError)
        .on('close', (d) => {
            console.log('closed')
            onClose(d)
            resolve()
        })
        .on('end', onEnd)
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

const storeSeqCounter = async ({ globalData, getLastSeq, queryServer }) => {
    // var lastSeq = await getLastSeq()
    var store = 0
    console.log('storeSeqCounter::')
    var runQuery = await queryServer({
        query: {
            keys: true,
            values: false,
            gt: globalData.config.uuid,
            lt: globalData.config.uuid + '\xff',
            limit: 1,
            reverse: true
        },
        onData: (key) => { store = key }
    })
    console.log('runQuery:', store)
    // var store = Number(lastSeq._seq)
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
    // get: () => storeCounter
}


// const insertOne = globalData => seqCounter => async () => {
//     var error = null
//     var data = null
//     var _seq = seqCounter.encode()

//     try {
//         var response = await globalData.table.tac.seq.put({ _seq }, {})
//         data = {
//             _seq
//         }
//     } catch (e) {
//         // console.log('seq.put Error:', error)
//         error = {
//             msg: e + `. Error trying to table.seq.put(${_seq},{})`
//         }
//     }
//     return globalData.standarizedResponse({
//         error,
//         data
//     })
// }
// const exportModel = (insertOne) => then(seqCounter => {
//     return {
//         insertOne: () => insertOne(seqCounter)()
//     }
// })
// const encode = () => ({
//     keyEncoding: {
//         type: 'sequence',
//         encode: ({ _seq }) => {
//             var toEncode = config.uuid + '!' + lexint.pack(_seq, 'hex')
//             // console.log('encode:', toEncode)
//             return toEncode
//         },
//         decode: (n) => {
//             var toDecode = n.split('!');
//             // console.log('decode:', toDecode)
//             return {
//                 _idDB: toDecode[0],
//                 _seq: lexint.unpack(toDecode[1])
//             }
//         },
//         buffer: false
//     },
//     valueEncoding: 'json'
// })

const insertOne = ({ globalData, encoder, storeSeqCounter }) => async () => {
    var storeSeq = await storeSeqCounter
    // console.log('_seq.next()::', _seq.next())
    var nextSeq = storeSeq.decoded.nextSeq()
    var actualKey = storeSeq.encoded.getCurrentKey()
    var key = encoder.keyEncoding.encode({
        _seq: nextSeq
    })
    console.log('key::', key)

    var response = await globalData.table.seq.tac.put(key, '')
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



// export default globalData => compose(
//     exportModel(
//         insertOne(globalData)
//     ),
//     seqEncode(getLastSeq)
// )(
//     globalData
// )

export default globalData => evol(
    ['encoder', encoder],
    ['queryServer', queryServer],
    ['getLastSeq', getLastSeq],
    ['storeSeqCounter', storeSeqCounter],
    ['insertOne', insertOne]
)(
    composition => ({
        insertOne: composition.insertOne
    })
)({ globalData })