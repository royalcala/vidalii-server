import { validateInsert } from './validateNewDoc'
import { reducePipeFxs } from './reducePipeFxs'
const uuid = require('uuid/v1');
const delDoc = async ({ db, tableName, _id }) => {
    return db(tableName)
        .where({ _id })
        .del()
}
const updateDoc = async ({ db, tableName, _id, dataToMutate }) => {
    return db(tableName)
        .where({ _id })
        .update(dataToMutate)
}
const insertDoc = async ({ db, tableName, _id, dataToMutate }) => {
    if (_id !== null)
        dataToMutate['_id'] = _id
    else
        dataToMutate['_id'] = uuid()

    return db(tableName).insert(dataToMutate)
}

const mutationDocumentTable = async ({ schema, tableName, newDoc, db }) => {
    const { _id = null, _insert = null, _update = null, _del = null, ...dataDoc } = newDoc
    let dataToMutate = {}
    let key
    let dataToMutateIsEmpty = true
    for (key in dataDoc) {
        if (schema[key].hasOwnProperty('vidaliiLeaf')) {
            dataToMutate[key] = dataDoc[key]
            dataToMutateIsEmpty = false
        } else if (typeof schema[key] === 'object') {
            mutationDocumentTable({
                schema: schema[key],
                tableName: key,
                newDoc: dataDoc[key],
                db
            })
        }
    }
    if (!dataToMutateIsEmpty) {
        if (_insert !== null)
            return insertDoc({ db, tableName, dataToMutate })
        else if (_udpate !== null)
            return updateDoc({ db, tableName, dataToMutate })
    } else if (_del !== null)
        return delDoc({ db, tableName, dataToMutate })

    return 'Nothing to do'

}
const defaultFx = ({ newDoc }) => newDoc
export default (schema, db,
    { //over root _insert, _update, _del
        beforeValidateInsert = defaultFx,
        beforeSaveInsert = defaultFx,
        afterSaveInsert = defaultFx,
    } = {}
    // ) => async (key, value) => {
) => async newDoc => {
    try {
        // let newDoc = reducePipeFxs(
        //     beforeValidateInsert,
        //     validateInsert({ schema }),
        //     beforeSaveInsert,
        //     afterSaveInsert
        // )({ newDoc })

        // let response = await db.insertOne(key, newDoc)
        let response = await mutationDocumentTable({ schema, tableName: 'root', db, newDoc })
        return response
        // return ({
        //     ...response,
        //     schemadb: {
        //         value: newDoc
        //     }
        // })
    } catch (err) {
        return ({
            error: {
                msg: 'Error on schemadb.insertOne:' + err
            }
        })
    }

}