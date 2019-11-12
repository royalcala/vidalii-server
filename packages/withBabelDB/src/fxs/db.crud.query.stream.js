import { toPairs, reduce, assoc, cond, equals, mergeDeepRight } from 'ramda'
var lexint = require('lexicographic-integer')
import { evolCompose } from '@vidalii/evol'

const mergeInDB = ({ init_db, reduce_dbs_assoc }) => {
    for (var i in init_db) {
        // console.log(i)        
        init_db[i].tac = reduce_dbs_assoc[i]
    }
    return init_db
}

const reduce_dbs_assoc = ({ init_db, assoc_queryStream }) => reduce(
    assoc_queryStream,
    {}
)(toPairs(init_db))

const assoc_queryStream = ({ queryStream }) => (acc, [nameTable, valueTable]) => assoc(
    nameTable,
    queryStream({ nameTable, valueTable }),
    acc
)

const queryStream = ({ parent: { config } }) =>
    ({ nameTable, valueTable }) => ({
        query,
        onData = () => { },
        onError = () => { },
        onClose = () => { },
        onEnd = () => { }
    }) => new Promise((resolve, reject) => {

        //the values of keys, and values can be change inside the query parameter
        var keys = true
        var values = true
        // var store = []
        // var search = {
        //     gt: globalData.config.uuid,
        //     lt: globalData.config.uuid + '\xff',
        //     limit: 1,
        //     reverse: true
        // }
        // console.log('queryServer running:', { keys, values, ...query })
        valueTable.createReadStream({ keys, values, ...query })
            .on('data', onData)
            .on('error', onError)
            .on('close', (d) => {
                // console.log('closed')
                onClose(d)
                resolve()
            })
            .on('end', onEnd)
    })

const selectTypeEncoder = ({ parent: { config }, createEncoder }) => ({ nameTable }) => {
    const encoderSeq = () => ({
        keyEncoding: {
            encode: ({ _seq }) => {
                var toEncode = config.uuid + '!' + lexint.pack(_seq, 'hex')
                return toEncode
            },
            decode: (key) => {
                var toDecode = key.split('!')
                return {
                    _idServer: toDecode[0],
                    _seq: lexint.unpack(toDecode[1])
                }
            }
        },
        // valueEncoding
    })

    return cond([
        [equals('seq'), () => createEncoder(encoderSeq)],
        [equals('seq'), () => createEncoder(encoderSeq)],
        [equals('seq'), () => createEncoder(encoderSeq)],
        [() => true, encoderDocs],
    ])(nameTable)
}

const createEncoder = () => (schema = {}) => {
    const defaultEncoderBuffer = {
        keyEncoding: {
            encode: a => a,
            decode: a => a
        },
        valueEncoding: {
            encode: a => a,
            docode: a => a
        }
    }
    return mergeDeepRight(defaultEncoderBuffer, schema)
}

export default evolCompose(
    ['mergeInDB', mergeInDB],
    ['reduce_dbs_assoc', reduce_dbs_assoc],
    ['assoc_queryStream', assoc_queryStream],
    ['queryStream', queryStream],
    ['selectTypeEncoder', selectTypeEncoder],
    ['createEncoder', createEncoder]
)(
    children => children.mergeInDB
)