
const getLastSeq = async ({ db, config }) => {
    console.log('entrooooooooooo??')
    let _seq = 0
    console.time('withIterator')
    let response = await db.seq.query.iterator({
        query: {
            // lte: config._id_table + '\xff',
            // limit: 10,
            // reverse: true,
            values: false
        },
        onData: key => {
            console.log('keyyyyyyy', key)
            _seq = key._seq
        }
    })
   
    console.timeEnd('withIterator')
    console.log('_seq::entroo-->', _seq)
    return _seq
}
const getLastSeq2 = async ({ db, config }) => {
    let _seq = 0
    console.time('withIterator')
    let response = await db.seq.query.iterator({
        query: {
            lte: config._id_table + '\xff',
            limit: 1,
            reverse: true
        },
        onData: key => {
            _seq = key._seq
        }
    })
    console.log(_seq)
    console.timeEnd('withIterator')
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
        }
        // getEncodedKey: () => db.seq.encoder.keyEncoding.encode({ _seq })
    }

}