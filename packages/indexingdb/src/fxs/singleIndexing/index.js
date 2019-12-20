import codecs from './codecs'
import { split, path } from 'ramda'

const preBatchPut = listFields => ({ key, value, preBatch }) => {
    let listPreBatchs = []
    for (let index = 0; index < listFields.length; index++) {
        let pathIndex = split('.', listFields[index])
        let valueOfIndex = path(pathIndex, value)
        if (valueOfIndex !== undefined) {
            listPreBatchs.push(
                preBatch([{
                    type: 'put',
                    key: {
                        nameField: listFields[index],
                        valueField: valueOfIndex,
                        idDoc: key
                    },
                    // key: listFields[index].concat('!!', valueOfIndex, '!!', key),
                    value: {}
                }])[0]
            )
        }

    }
    return listPreBatchs
}


export default listFields => {

    return {
        codecs,
        put: preBatchPut(listFields),
        get: ({ indexName }) => (key, value) => {

        },
        del: (key, value) => {

        },
    }
}