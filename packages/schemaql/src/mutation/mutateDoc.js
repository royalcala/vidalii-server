import { delDoc, insertDoc, updateDoc } from './crudFxs'
import { batchInsert } from './crudFxs'
const filterDataToMutate = ({ dataDoc, schema }) => {
    let dataToMutate = {}
    let key
    let dataToMutateIsEmpty = true
    let childrenDocs = []
    for (key in dataDoc) {
        if (schema[key].hasOwnProperty('vidaliiLeaf')) {
            dataToMutate[key] = dataDoc[key]
            dataToMutateIsEmpty = false
        } else if (typeof schema[key] === 'object') {
            childrenDocs.push({
                schema: schema[key],
                tableName: key,
                newDoc: dataDoc[key],
                trx
            })

        }
    }
    return {
        dataToMutate,
        dataToMutateIsEmpty,
        childrenDocs
    }
}

const mutationDocumentTable = async ({ trx, schema, tableName, newDoc, result_ids = {} }) => {
    if (!Array.isArray(newDoc)) {
        newDoc = [newDoc]
    }
    const insert = batchInsert({ trx, tableName })
    for (let index = 0; index < newDoc.length; index++) {
        const {
            _id = null, _insert = null,
            _update = null, _del = null,
            ...dataDoc
        } = newDoc[index]
        const {
            dataToMutate,
            dataToMutateIsEmpty,
            childrenDocs } = filterDataToMutate({ dataDoc, schema })
        // let dataToMutate = {}
        // let key
        // let dataToMutateIsEmpty = true
        // let childrenDocs = []

        // for (key in dataDoc) {
        //     if (schema[key].hasOwnProperty('vidaliiLeaf')) {
        //         dataToMutate[key] = dataDoc[key]
        //         dataToMutateIsEmpty = false
        //     } else if (typeof schema[key] === 'object') {
        //         childrenDocs.push({
        //             schema: schema[key],
        //             tableName: key,
        //             newDoc: dataDoc[key],
        //             trx
        //         })

        //     }
        // }

        if (!dataToMutateIsEmpty) {
            if (_insert === true)
                _id = insert.add({ _id, data: dataToMutate })
            else if (_update === true)
                return updateDoc({ db, tableName, _id, dataToMutate })
            else if (_del === true)
                return delDoc({ db, tableName, _id, dataToMutate })
        }
        //mutate childrenDocs
        for (let index = 0; index < childrenDocs.length; index++) {
            childrenDocs[index]._id = _id
            mutationDocumentTable(childrenDocs[index])
        }

        // return {
        //     error: 'No property crud found, please specified one:_insert,_update,_del',
        //     data: null
        // }
    }//for batch insert
    let response = await insert.exec()
    console.log('response::', response)
}


export default mutationDocumentTable