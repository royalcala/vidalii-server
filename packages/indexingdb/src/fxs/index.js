import { json as jsoncodecs, utf8 } from '@vidalii/encodingdb/src/codecs'
import { split, path } from 'ramda'

const Put = listFields => ({ key, value, preBatch }) => {
    let listPreBatchs = []
    for (let index = 0; index < listFields.length; index++) {
        let pathIndex = split('.', listFields[index])
        let valueOfIndex = path(pathIndex, value)
        if (valueOfIndex !== undefined) {
            listPreBatchs.push(
                preBatch([{
                    type: 'put',
                    key: listFields[index].concat('!!', valueOfIndex, '!!', key),
                    value: {}
                }])[0]
            )
        }

    }
    return listPreBatchs
}

const codecs = {
    keyEncoding: {
        // encode use default string/buff
        decode: utf8.keyEncoding.decode
    },
    valueEncoding: jsoncodecs.valueEncoding
}
export const singleIndexing = listFields => {

    return {
        codecs,
        put: Put(listFields),
        // put: ({ key, value, preBatch }) => {
        //     let listPreBatchs = []
        //     for (let index = 0; index < listFields.length; index++) {
        //         let pathIndex = split('.', listFields[index])
        //         let valueOfIndex = path(pathIndex, value)
        //         if (valueOfIndex !== undefined) {
        //             listPreBatchs.push(
        //                 preBatch([{
        //                     type: 'put',
        //                     key: listFields[index].concat('!!', valueOfIndex, '!!', key),
        //                     value: {}
        //                 }])[0]
        //             )
        //         }

        //     }
        //     return listPreBatchs
        // },
        get: (key, value) => {

        },
        del: (key, value) => {

        },
    }
}
