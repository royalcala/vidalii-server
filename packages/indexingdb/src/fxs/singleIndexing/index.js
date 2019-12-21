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
        get: async ({ docsdb, indexdb }) => {
            let indexDataFound = []
            await indexdb.iteratorP({
                onData: row => indexDataFound.push(row),
                values: false,
                // onData: console.log
            })
            let docsFound = []
            for (let i = 0; i < indexDataFound.length; i++) {
                try {
                    let response = await docsdb.get(indexDataFound[i].idDoc)
                    docsFound.push(response.data)
                } catch (error) {                    
                }               
            }
            console.log('docsFound::',docsFound)
            // await indexdb.iteratorP({
            //     onData: console.log,                
            // reverse: true,
            // gte: { _id, encodedRev: '\x00' },
            // lte: { _id, encodedRev: '\xFF' },
            // limit: 1,

            // })            
            return indexDataFound
        },
        del: (key, value) => {

        },
    }
}