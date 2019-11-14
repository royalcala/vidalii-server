import {
    toPairs, reduce,
    assoc, ifElse, has, cond, equals, mergeDeepRight
} from 'ramda'
import newFxs from './db.crud.tac.newFxs'
import { evolCompose } from '@vidalii/evol'

const mergeInDB = ({ init_db, reduce_dbs_assoc }) => {
    for (var i in init_db) {
        init_db[i].queryStream = reduce_dbs_assoc[i]
    }
    return init_db
}

const reduce_dbs_assoc = ({ init_db, assoc_queryStream }) => reduce(
    assoc_queryStream,
    {}
)(toPairs(init_db))

const assoc_queryStream = ({ queryStream, encoders }) => (acc, [nameTable, valueTable]) => assoc(
    nameTable,
    queryStream({
        nameTable, valueTable, encoder: ifElse(
            has(nameTable),
            () => encoders[nameTable],
            () => encoders.default
        )(encoders)
    }),
    acc
)

const queryStream = ({ ifWithEncoder }) =>
    ({ nameTable, valueTable, encoder }) => ({
        query = {},
        withEncoder = true,
        onData = () => { },
        onError = () => { },
        onClose = () => { },
        onEnd = () => { }
    }) => new Promise((resolve, reject) => {
        var defaultQuery = {
            keys: true,
            values: true,
            limit: -1,
            reverse: false
        }
        var finalQuery = mergeDeepRight(defaultQuery, query)
        const fxData = ifWithEncoder({
            encoder,
            onData,
            withEncoder,
            finalQuery
        })
        valueTable.createReadStream(finalQuery)
            .on('data', fxData)
            .on('error', onError)
            .on('close', (d) => {
                onClose(d)
                resolve()
            })
            .on('end', onEnd)



    })


const ifWithEncoder = () => ({ encoder, onData, withEncoder, finalQuery }) => {
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

export default evolCompose(
    ['mergeInDB', mergeInDB],
    ['reduce_dbs_assoc', reduce_dbs_assoc],
    ['assoc_queryStream', assoc_queryStream],
    ['queryStream', queryStream],
    ['ifWithEncoder', ifWithEncoder]
)(
    children => children.mergeInDB
)