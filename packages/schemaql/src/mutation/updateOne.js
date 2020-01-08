// import validateUpdate from './validateUpdate'
import { validateUpdate } from './validateNewDoc'
import { reducePipeFxs } from './reducePipeFxs'

const getPrevDoc = async (db, key) => {
    // try {    
    let response = await db.get(key)
    return response
    //     return response.data
    // } catch (error) {
    //     return response.data = null
    // }
}
const defaultFx = ({ newDoc }) => newDoc
export default (schema, db,
    {
        preValidateUpdate = defaultFx,
        preSaveUpdate = defaultFx,
        afterSaveUpdate = defaultFx,
    } = {}
) => async (key, value) => {
    let prevDoc = await getPrevDoc(db, key)
    try {
        let newDoc = reducePipeFxs(
            preValidateUpdate,
            preSaveUpdate,
            validateUpdate({schema}),
            afterSaveUpdate
        )({ prevDoc, newDoc: value })
        let response = await db.replaceOne(key, newDoc)
        return ({
            ...response,
            schemadb: {
                value: newDoc
            }
        })
    } catch (err) {
        return ({
            error: {
                msg: 'Error on schemadb.insertOne:' + err
            }
        })
    }

}