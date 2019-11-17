export default async ({ db, config }) => {
    var _seq = 0
    var lastSeq = await db.seq.query.stream({
        query: {
            keys: true,
            values: false,
            gt: config._id_table,
            lt: config._id_table + '\xff',
            limit: 1,
            reverse: true
        },
        decoderOuts: {
            keys: true
        },
        onData: key => {
            _seq = key._seq
        }
    })
    // console.log('acual_seq:', _seq)
    return {
        nextSeq: () => {
            _seq += 1
            return _seq
        },
        // getEncodedKey: () => db.seq.encoder.keyEncoding.encode({ _seq })
    }

}