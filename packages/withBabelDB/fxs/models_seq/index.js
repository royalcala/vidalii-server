import { compose, pipe, then, curry } from 'ramda'
const getLastSeq = globalData => new Promise((resolve, reject) => {
    var store = 0
    var search = {
        lt: { _seq: 999999999 },
        limit: 1,
        reverse: true
    }
    console.log(
        Object.keys(globalData)
    )
    globalData.db.seq.createKeyStream(search)
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
// const insertOne = globalData => async seqCounter => {
//     var error = null
//     var data = null
//     var _seq = seqCounter.add()

//     try {
//         var response = await globalData.db.seq.put({ _seq }, {})
//         data = {
//             _seq
//         }
//     } catch (e) {
//         // console.log('seq.put Error:', error)
//         error = {
//             msg: e + `. Error trying to db.seq.put(${_seq},{})`
//         }
//     }
//     return globalData.standarizedResponse({
//         error,
//         data
//     })
// }

const insertOne = globalData => seqCounter => async () => {
    var error = null
    var data = null
    var _seq = seqCounter.add()

    try {
        var response = await globalData.db.seq.put({ _seq }, {})
        data = {
            _seq
        }
    } catch (e) {
        // console.log('seq.put Error:', error)
        error = {
            msg: e + `. Error trying to db.seq.put(${_seq},{})`
        }
    }
    return globalData.standarizedResponse({
        error,
        data
    })
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
    // then(s => () => ''),
    seqCounter(getLastSeq)
)(
    globalData
)

// export default globalData => compose(
//     then(
//         (seqCounter) => ({
//             insertOne: () => insertOne(globalData)(seqCounter)
//         })
//     ),
//     seqCounter(getLastSeq)
// )(
//     globalData
// )

// export default globalData => pipe(
//     seqCounter(getLastSeq),
//     then(s => ({
//         insertOne: () => insertOne(globalData)(s)
//     }))
// )(
//     globalData
// )