import { pipe } from 'ramda'
import validateUpdate from './validateUpdate'


const getPrevDoc = async (db, key) => {
    try {
        let response = db.get(key)
        return response.data
    } catch (error) {
        return response.data = null
    }
}
const defaultFx = ({ prevDoc, newDoc }) => ({ prevDoc, newDoc })
export default (schema, db,
    {
        preValidateUpdate = defaultFx,
        preSaveUpdate = defaultFx,
        afterSaveUpdate = defaultFx,
    } = {}
) => async (key, value) => {
    let prevDoc = await getPrevDoc(db, key)
    try {
        let { newDoc } = await pipe(
            preValidateUpdate,
            preSaveUpdate,
            validateUpdate(schema),
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