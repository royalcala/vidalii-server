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

export default async ({ dbs }) => {
    var storeCounter = await getLastSeq({ dbs })
    return {
        seqCounter: {
            add: () => {
                storeCounter += 1
                return storeCounter
            },
            get: () => storeCounter,
            // recheck: async ({ _seq }) => {
            //     try {
            //         var response = await dbs.seq.get(_seq) 
            //     } catch (error) {
                    
            //     }
               
            // }
        }

    }
}