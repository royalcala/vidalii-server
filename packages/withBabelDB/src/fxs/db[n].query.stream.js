import { mergeDeepRight, ifElse, equals, cond } from 'ramda'
const ifWithEncoder = ({ onData, decodeKey, decodeValue, query }) => {

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
        //aditional external lib levelup
        keys: true,
        values: true,
        decoderOuts: {
            keys: true,
            values: true
        },
        onData: () => { },
        onError: () => { },
        onClose: () => { },
        onEnd: () => { }
    }
    return mergeDeepRight(defaults, query)
}
// const initDefaultsDecoderOuts = ({ decoderOuts }) => {
//     var defaults = {
//         keys: true,
//         values: true
//     }
//     return mergeDeepRight(defaults, decoderOuts)
// }

const queryStream = ({ db }) => (
    query = {}
    // encoderEntrie = false,// not implemented yet onlye false...check the values to search like gt lt etc...

) => new Promise((resolve, reject) => {
    //init defaults if its not defined by the user
    query = initQueryDefaults({ query })
    // decoderOuts = initDefaultsDecoderOuts({ decoderOuts: query.decoderOuts })    
    const onDataWithDecoders = ifWithEncoder({
        onData: query.onData,
        query,
        decodeKey: decodeKey({ db, decoderOuts: query.decoderOuts }),
        decodeValue: decodeValue({ db, decoderOuts: query.decoderOuts }),
    })    
    db.createReadStream(query)
        .on('data', onDataWithDecoders)
        .on('error', query.onError)
        .on('close', (d) => {
            query.onClose(d)
            resolve()
        })
        .on('end', query.onEnd)
})


export default (nameDB) => ({ db }) => queryStream({
    db: db[nameDB]
})