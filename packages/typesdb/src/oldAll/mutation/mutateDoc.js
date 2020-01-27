import { SEPARATOR } from '../CONSTANTS'
const uuid = require('uuid/v1');


const iterateOneDoc = ({ iterateManyDocs, tableName, dataDoc, schema, crud }) => {
    let dataToMutate = {}
    let key
    let dataToMutateIsEmpty = true
    // const { _id, parent_id = null, ...otherData } = dataDoc
    // dataDoc already doesnt has _id and parent_id
    for (key in dataDoc) {
        if (schema[key].hasOwnProperty('vidaliiLeaf')) {
            dataToMutate[key] = dataDoc[key]
            dataToMutateIsEmpty = false
        } else if (typeof schema[key] === 'object') {
            iterateManyDocs({
                crud,
                schema: schema[key],
                tableName: tableName + SEPARATOR + key,
                newDoc: dataDoc[key],
                // type: 'extended',
                parent_id: _id
            })

        }
    }
    return {
        dataToMutate,
        dataToMutateIsEmpty
    }
}

const iterateManyDocs = async ({ crud, schema, tableName, newDoc, parent_id = null }) => {
    if (!Array.isArray(newDoc)) {
        newDoc = [newDoc]
    }

    for (let index = 0; index < newDoc.length; index++) {
        let {
            _id = null,
            _action = 'insert',
            ...dataDoc
        } = newDoc[index]
        if (_id === null && _action === 'insert')
            _id = uuid()

        const {
            dataToMutate,
            dataToMutateIsEmpty,
        } = iterateOneDoc({ iterateManyDocs, tableName, dataDoc, schema, crud })

        if (!dataToMutateIsEmpty) {
            switch (_action) {
                case 'insert':
                    crud.insert.add({ tableName, _id, parent_id, data: dataToMutate })
                    break;
                case 'update':
                    crud.update.add({ tableName, _id, data: dataToMutate })
                    break;
            }
        }
        if (_action === 'del') {
            crud.del.add({ tableName, _id })
        }


    }
}


export default iterateManyDocs