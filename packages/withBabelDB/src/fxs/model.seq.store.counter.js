
const getLastSeq = async ({ db, config }) => {
    let _seq = 0
    // console.time('withIterator')
    let response = await db.seq.query.iterator({
        onData: key => {
            _seq = key._seq
        },
        decoderOut: true,
        lte: config._id_table + '\xff',
        limit: 1,
        reverse: true,
        values: false
    },
    )
    return _seq
}
const getLastSeq2 = async ({ db, config }) => {
    let _seq = 0
    let response = await db.seq.query.stream({
        query: {
            lte: config._id_table + '\xff',
            limit: 1,
            reverse: true,
            values: false
        },
        onData: key => {
            _seq = key._seq
        }
    })
    return _seq
}
export default async ({ db, config }) => {
    let _seq = getLastSeq({ db, config })


    // console.log('acual_seq:', _seq)
    return {
        nextSeq: () => {
            _seq += 1
            return _seq
        },
        getActualSeq: () => _seq,
        restoreSeq: async () => {
            _seq = await getLastSeq({ db, config })
            return _seq
        },
        restoreSeq2: async () => {
            _seq = await getLastSeq2({ db, config })
            return _seq
        }
        // getEncodedKey: () => db.seq.encoder.keyEncoding.encode({ _seq })
    }

}