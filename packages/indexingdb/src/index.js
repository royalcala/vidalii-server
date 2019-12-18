import encodingdb from '@vidalii/encodingdb'
import { json as jsoncodecs, utf8 } from '@vidalii/encodingdb/src/codecs'
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

const PutIndexes = ({ subdbIndexes, indexes }) => ({ key, value }) => {
    let size = indexes.length
    let preBatchs = []
    for (let i = 0; i < size; i++) {
        // preBatchs.push()
        // let result = indexes.put({
        //     key,
        //     value,
        //     preBatch: subdbIndexes[indexes.nameIndex].preBatch
        // })
        console.log('indexes[i].nameIndex::', indexes[i].nameIndex)
        console.log('subdbIndexes::', subdbIndexes)
    }

}
const indexCodecs = {
    keyEncoding: {
        // encode use default string/buff
        decode: utf8.keyEncoding.decode
    },
    valueEncoding: jsoncodecs.valueEncoding
}
//db->dbEncodedJson
export default ({ indexes = [], prefix = 'indexes' }) => db => {
    const mainIndex = subdb({ prefix })(db)
    const subdbIndexes = indexes.reduce(
        (acc, index) => {
            return {
                ...acc,
                [index.nameIndex]: subdb({ prefix: index.nameIndex })(mainIndex)
            }
        },
        {}
    )
    console.log('subdbIndexes::', subdbIndexes)
    const putIndexes = PutIndexes({ subdbIndexes, indexes })

    return {
        ...db,
        composition: {
            ...db.composition,
            indexdb: true
        },
        putPreBatch: (key, value) => {

        },
        delPreBatch: (key, value) => {

        },
        put: async (key, value, options = {}) => {
            let response = await putIndexes({ key, value })
            console.log('response putIndexes::', response)
            return db.put(key, value, options)
        },
        find: ({ query, index }) => {

        },
        del: () => {

        }
    }

}