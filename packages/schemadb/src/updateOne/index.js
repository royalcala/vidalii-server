import { pipe } from 'ramda'
import validateUpdate from './validateUpdate'
export default (schema, db,
    {
        preValidateUpdate = ({ newDoc }) => ({ newDoc }),
        preSaveUpdate = ({ newDoc }) => ({ newDoc }),
        afterSaveUpdate = ({ newDoc }) => ({ newDoc }),
    } = {}
) => async (key, value) => {
    try {
        let { newDoc } = await pipe(
            preValidateUpdate,
            preSaveUpdate,
            preValidateUpdate(schema),
            afterSaveUpdate
        )({ newDoc: value })
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