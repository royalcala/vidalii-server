import { pipe } from 'ramda'
import validateInsert from './validateInsert'

const defaultFx = ({ newDoc }) => ({ newDoc })
export default (schema, db,
    {
        preValidateInsert = defaultFx,
        preSaveInsert = defaultFx,
        afterSaveInsert = defaultFx,
    } = {}
) => async (key, value) => {
    try {
        let { newDoc } = await pipe(
            preValidateInsert,
            preSaveInsert,
            validateInsert(schema),
            afterSaveInsert
        )({ newDoc: value })
        let response = await db.insertOne(key, newDoc)
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