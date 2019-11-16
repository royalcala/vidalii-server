export default async ({ db, config }) => {
    var _seq = 0
    var lastSeq = await table.db.seq.query.stream({
        query: {
            keys: true,
            values: false,
            gt: config._idTable,
            lt: config._idTable + '\xff',
            limit: 1,
            reverse: true
        },
        decoderOuts: {
            key: true
        },
        onData: key => {
            _seq = key._seq
        }
    })
    console.log('acual_seq:', _seq)
    return {
        nextSeq: () => {
            _seq += 1
            return _seq
        },
        // getEncodedKey: () => db.seq.encoder.keyEncoding.encode({ _seq })
    }

}