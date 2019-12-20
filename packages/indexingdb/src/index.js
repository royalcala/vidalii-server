import encodingdb from '@vidalii/encodingdb'
import subdb from '@vidalii/subdb'
import { pipe } from 'ramda'

// const indexes = [
//     {
//         name: 'default',
//         fx: singleIndexing([
//             ['folio'],
//             ['spec.size']
//             ['spec.color']
//         ])
//     }
// ]

const indexFxPut = ({ dbs, indexes }) => ({ key, value }) => {
    let preBatchs = []
    for (let i = 0; i < indexes.length; i++) {
        preBatchs.push(
            ...indexes[i].fx.put({
                key,
                value,
                preBatch: dbs.index[indexes[i].name].preBatch
            })
        )
    }
    return preBatchs
}
const initDBS = ({ indexes, prefix, db }) => {
    const dbIndexes = subdb({ prefix })(db)
    const dbIndexesFxName = indexes.reduce(
        (acc, index) => {
            let { name, fx } = index
            let { codecs } = fx
            return {
                ...acc,
                [name]: pipe(
                    subdb({ prefix: name }),
                    encodingdb(codecs),
                )(dbIndexes)
            }
        },
        {}
    )
    return {
        index: dbIndexesFxName
    }
}
export default ({ indexes = [], prefix = 'indexes' }) => db => {
    const dbs = initDBS({ indexes, prefix, db })
    const indexPreBatch = {
        put: indexFxPut({ dbs, indexes }),
        get: '',
        del: ''
    }

    return {
        // ...db,
        composition: {
            ...db.composition,
            indexdb: true
        },
        forTestingIndex: {
            dbs
        },
        index: { ...dbs.index },
        preBatchIndexes: (ops, options = {}) => {
            let batchsIndexes = []
            for (let index = 0; index < ops.length; index++) {
                const { type, key, value } = ops[index]
                batchsIndexes.push(...indexPreBatch.put({ key, value }))
            }
            return batchsIndexes
        },
        find: ({ select = null, where = null, sortby = null, ...othersWheres }) => {

        }
    }

}