export default async ({ db, config }) => {
    var _seq = 0
    var lastSeq = await db.seq.query.stream({
        query: {
            keys: true,
            values: false,
            gt: config.uuid,
            lt: config.uuid + '\xff',
            limit: 1,
            reverse: true
        },
        onData: (key) => { _seq = key._seq }
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