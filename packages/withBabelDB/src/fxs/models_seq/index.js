import { compose, then } from 'ramda'
const getLastSeq = globalData => new Promise((resolve, reject) => {
    var store = 0
    var search = {
        lt: { _seq: 999999999 },
        limit: 1,
        reverse: true
    }
    globalData.table.seq.createKeyStream(search)
        .on('data', function ({ _idDB, _seq }) {
            // console.log(data.key, '=', data.value)
            store = _seq
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

const seqCounter = getLastSeq => async globalData => {
    var storeCounter = await getLastSeq(globalData)
    return {
        add: () => {
            storeCounter += 1
            return storeCounter
        },
        get: () => storeCounter
    }
}

// const insertOne = globalData => seqCounter => async () => {
//     var error = null
//     var data = null
//     var _seq = seqCounter.add()

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
const insertOne = globalData => seqCounter => async () => {
    var _seq = seqCounter.add()
    var response = await globalData.table.tac.seq.put({ _seq }, {})
    return globalData.fxs.standarizedResponse(response)
}

const exportModel = (insertOne) => then(seqCounter => {
    return {
        insertOne: () => insertOne(seqCounter)
    }
})

export default globalData => compose(
    exportModel(
        insertOne(globalData)
    ),
    seqCounter(getLastSeq)
)(
    globalData
)