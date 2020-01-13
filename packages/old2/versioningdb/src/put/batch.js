import put from "."

export default async ({ subdb, config, keyRev, valueRev }) => {
    const seqPrefix = subdb.seq.subPrefixConcat
    try {
        let seqPreBatch = subdb.seq.preBatch([
            {
                type: 'put',
                key: { _id_db: config._id_db, _seq: config.seq.insertAndInc() },
                value: {}
            }
        ])
        // console.log('seqPreBatch::',seqPreBatch)
        let response = await subdb.rev.batch([
            { type: 'put', key: keyRev, value: valueRev },
            ...seqPreBatch
            // {
            //     type: 'put', customSubdb: seqPrefix,
            //     key: { _id_db: config._id_db, _seq: config.seq.insertAndInc() },
            //     value: {}
            // }
        ])
        return response
    } catch (error) {
        return error
    }

}