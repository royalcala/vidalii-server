import { mergeDeepRight, ifElse, equals, cond } from 'ramda'
const ifWithEncoder = ({ encoder, onData, decodeKey, decodeValue, query }) => {
    const ifStreamWithKeyAndValue = [
        ({ keys, values }) => keys === true && values === true,
        () => (doc) => {
            // console.log('dataWithoutEncoder::', doc)
            // console.log('dataDecoded:', {
            //     key: decodeKey(doc.key),
            //     value: decodeValue(doc.value)
            // })
            onData({
                key: decodeKey(doc.key),
                value: decodeValue(doc.value)
            })
        }
    ]
    const ifStreamOnlyKey = [
        ({ keys, values }) => keys === true && values === false,
        () => (key) => {
            onData(decodeKey(key))
        }
    ]
    const ifStreamOnlyValue = [
        ({ keys, values }) => keys === false && values === true,
        () => (value) => {
            onData(decodeValue(value))
        }
    ]

    return cond([
        ifStreamWithKeyAndValue,
        ifStreamOnlyKey,
        ifStreamOnlyValue
    ])(query)

}
const decodeKey = ({ db, decoderOuts }) => key =>
    decoderOuts.keys ? db.encoder.keyEncoding.decode(key) : key

const decodeValue = ({ db, decoderOuts }) => value =>
    decoderOuts.values ? db.encoder.valueEncoding.decode(value) : value

const initQueryDefaults = ({ query }) => {
    var defaults = {
        keys: true,
        values: true,
        limit: -1,
        reverse: false
    }
    return mergeDeepRight(defaults, query)
}
const initDefaultsDecoderOuts = ({ decoderOuts }) => {
    var defaults = {
        keys: true,
        values: true
    }
    return mergeDeepRight(defaults, decoderOuts)
}

const queryStream = ({ db }) => ({
    query = {},//options from external lib
    encoderEntrie = false,// not implemented yet onlye false...check the values to search like gt lt etc...
    decoderOuts = {},
    onData = () => { },
    onError = () => { },
    onClose = () => { },
    onEnd = () => { }
}) => new Promise((resolve, reject) => {
    //init defaults if its not defined by the user
    query = initQueryDefaults({ query })
    decoderOuts = initDefaultsDecoderOuts({ decoderOuts })

    const onDataWithDecoders = ifWithEncoder({
        onData,
        query,
        decodeKey: decodeKey({ db, decoderOuts }),
        decodeValue: decodeValue({ db, decoderOuts }),
    })
    db.createReadStream(query)
        .on('data', onDataWithDecoders)
        .on('error', onError)
        .on('close', (d) => {
            onClose(d)
            resolve()
        })
        .on('end', onEnd)



})


export default (nameDB) => ({ db }) => queryStream({
    db: db[nameDB]
})