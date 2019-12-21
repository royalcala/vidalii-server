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

const indexFxPut = ({ index, indexes }) => ({ key, value }) => {
    let preBatchs = []
    for (let i = 0; i < indexes.length; i++) {
        preBatchs.push(
            ...indexes[i].fx.put({
                key,
                value,
                preBatch: index[indexes[i].name].db.preBatch
            })
        )
    }
    return preBatchs
}
const initDBS = ({ indexes, prefix, dbWhereSaveIndexes }) => {
    const dbIndexes = subdb({ prefix })(dbWhereSaveIndexes)
    const dbIndexesFxName = indexes.reduce(
        (acc, index) => {
            let { name, fx } = index
            let { codecs } = fx
            return {
                ...acc,
                [name]: {
                    db: pipe(
                        subdb({ prefix: name }),
                        encodingdb(codecs),
                    )(dbIndexes),
                    fx

                }
            }
        },
        {}
    )
    return dbIndexesFxName
}
export default ({ docsdb, indexes = [], prefix = 'indexes' }) => dbWhereSaveIndexes => {
    const index = initDBS({ indexes, prefix, dbWhereSaveIndexes })
    const indexPreBatch = {
        put: indexFxPut({ index, indexes }),
        get: '',
        del: ''
    }

    return {
        // ...db,
        composition: {
            ...db.composition,
            indexdb: true
        },
        index,
        preBatchIndexes: (ops, options = {}) => {
            let batchsIndexes = []
            for (let index = 0; index < ops.length; index++) {
                const { type, key, value } = ops[index]
                batchsIndexes.push(...indexPreBatch.put({ key, value }))
            }
            return batchsIndexes
        },
        // find: ({ select = null, where = null, sortby = null, ...othersWheres }) => {

        // }
        query: async (pipes) => {
            for (let i = 0; i < pipes.length; i++) {
                const { useIndex, get, pipe = null } = pipes[i]
                let data = await index[useIndex].fx.get({
                    docsdb,
                    indexdb: index[useIndex].db
                })
                console.log('data::', data)

            }
        }
    }

}