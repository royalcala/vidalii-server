import { validateInsert } from './validateNewDoc'
import { reducePipeFxs } from './reducePipeFxs'
import { delDoc, insertDoc, updateDoc } from './crudFxs'

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
        if (_insert === true)
            return insertDoc({ db, tableName, _id, dataToMutate })
        else if (_update === true)
            return updateDoc({ db, tableName, _id, dataToMutate })
    } else if (_del === true)
        return delDoc({ db, tableName, _id, dataToMutate })

    return {
        error: 'No property crud found, please specified one:_insert,_update,_del',
        data: null
    }

}
const defaultFx = ({ newDoc }) => newDoc
export default (schema, db,
    { //over root _insert, _update, _del
        beforeValidateInsert = defaultFx,
        beforeSaveInsert = defaultFx,
        afterSaveInsert = defaultFx,
    } = {}
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