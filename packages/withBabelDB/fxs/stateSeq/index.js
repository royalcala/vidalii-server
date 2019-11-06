const getLastSeq = ({ dbs }) => new Promise((resolve, reject) => {
    var store = 0
    var search = {
        lt: { _seq: 999999999 },
        limit: 1,
        reverse: true
    }
    dbs.seq.createKeyStream(search)
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

const initSeqCounter = ({ storeCounter }) => ({
    add: () => {
        storeCounter += 1
        return storeCounter
    },
    get: () => storeCounter
})

const initInsertOne = ({ dbs, seqCounter }) => async () => {
    var error
    var _seq = seqCounter.add()

    try {
        var response = await dbs.seq.put({ _seq }, {})
        error = false
    } catch (error) {
        console.log('seq.put Error:', error)
        error = true
    }
    return {
        error,
        _seq
    }
}

export default async ({ db_encode_up: dbs }) => {
    var storeCounter = await getLastSeq({ dbs })
    var seqCounter = initSeqCounter({ storeCounter })
    var insertOne = initInsertOne({ dbs, seqCounter })
    return {
        seqCounter,
        insertOne
    }
}