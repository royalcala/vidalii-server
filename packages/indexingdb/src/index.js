import encodingdb from '@vidalii/encodingdb'
import subdb from '@vidalii/subdb'
import { pipe } from 'ramda'

// const indexes = [
//     {
//         nameIndex: 'default',
//         fx: defaultIndexing([
//             ['folio'],
//             ['spec.size']
//             ['spec.color']
//         ])
//     }
// ]

//AND
//OR
//Merge IDs

const PutIndexes = ({ dbs, indexes }) => ({ key, value }) => {
    let preBatchs = []
    for (let i = 0; i < indexes.length; i++) {
        // let result = 
        preBatchs.push(
            ...indexes[i].fx.put({
                key,
                value,
                preBatch: dbs.index[indexes[i].nameIndex].preBatch
            })
        )
        // console.log('put of index:',indexes[i].nameIndex,':', result)
    }
    return preBatchs
}
// const indexCodecs = {
//     keyEncoding: {
//         // encode use default string/buff
//         decode: utf8.keyEncoding.decode
//     },
//     valueEncoding: jsoncodecs.valueEncoding
// }
const initDBS = ({ indexes, prefix, db }) => {
    const dbRoot = db
    const dbRootIndexes = subdb({ prefix })(dbRoot)
    const dbRootIndexesName = indexes.reduce(
        (acc, index) => {
            let { nameIndex, fx } = index
            let { codecs } = fx
            return {
                ...acc,
                [nameIndex]: pipe(
                    encodingdb(codecs),
                    subdb({ prefix: nameIndex })
                )(dbRootIndexes)
            }
        },
        {}
    )
    return {
        // root: dbRoot,
        index: dbRootIndexesName
    }
}
export default ({ indexes = [], prefix = 'indexes' }) => db => {
    const dbs = initDBS({ indexes, prefix, db })
    const putIndexes = PutIndexes({ dbs, indexes })

    return {
        ...db,
        composition: {
            ...db.composition,
            indexdb: true
        },
        forTestingIndex: {
            dbs
        },
        preBatchIndexes: (ops, options = {}) => {
            let batchsIndexes = []
            for (let index = 0; index < ops.length; index++) {
                const { type, key, value } = ops[index]
                batchsIndexes.push(...putIndexes({ key, value }))

            }
            return batchsIndexes
        },
        find: () => {

        }
    }

}