
export default async ({ subdb, config, keyRev, valueRev }) => {
    const seqPrefix = subdb.seq.subPrefixConcat
    try {
        let response = await subdb.rev.batch([
            { type: 'put', key: keyRev, value: valueRev },
            {
                type: 'put', customSubdb: seqPrefix,
                key: { _id_db: config._id_db, _seq: config.seq.insertAndInc() },
                value: {}
            }
        ])
        return response
    } catch (error) {
        return error
    }

}