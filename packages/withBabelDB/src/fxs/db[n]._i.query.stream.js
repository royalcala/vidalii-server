const ifWithEncoder = ({ encoder, onData, withEncoder, finalQuery }) => {
    const { keyEncoding, valueEncoding } = encoder
    const ifStreamWithKeyAndValue = [
        ({ keys, values }) => keys === true && values === true,
        () => (doc) => {
            onData({
                key: keyEncoding.decode(doc.key),
                value: valueEncoding.decode(doc.value)
            })
        }
    ]
    const ifStreamOnlyKey = [
        ({ keys, values }) => keys === true && values === false,
        () => (key) => {
            onData(keyEncoding.decode(key))
        }
    ]
    const ifStreamOnlyValue = [
        ({ keys, values }) => keys === true && values === false,
        () => (value) => {
            onData(valueEncoding.decode(value))
        }
    ]
    //change to table 'true-true':()=>fxs
    return ifElse(
        equals(false),
        () => onData,
        () => cond([
            ifStreamWithKeyAndValue,
            ifStreamOnlyKey,
            ifStreamOnlyValue
        ])(finalQuery)
    )(withEncoder)
}

const queryStream = ({ db }) => ({
    query: {
        keys = true,
        values = true,
        limit = -1,
        reverse = false
    },
    withEncoder = true,
    onData = () => { },
    onError = () => { },
    onClose = () => { },
    onEnd = () => { }
}) => new Promise((resolve, reject) => {
    // var defaultQuery = {
    //     keys: true,
    //     values: true,
    //     limit: -1,
    //     reverse: false
    // }
    // var finalQuery = mergeDeepRight(defaultQuery, query)
    const fxData = ifWithEncoder({
        encoder: db.encoder,
        onData,
        withEncoder,
        query
    })
    db.createReadStream(finalQuery)
        .on('data', fxData)
        .on('error', onError)
        .on('close', (d) => {
            onClose(d)
            resolve()
        })
        .on('end', onEnd)



})


export default (n) => ({ db }) => queryStream({
    db: db[n]
})