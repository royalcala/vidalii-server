import { pipe } from 'ramda'
import insertOne from '../insertOne'
import validateUpdate from './validateUpdate'
const getPrevDoc = async key => {

}


export default (schema, db, customPipes,
     {
    preValidateInsert = ({ newDoc }) => ({ newDoc }),
    preValidateUpdate = ({ prevDoc, newDoc }) => ({ newDoc }),
    preSaveInsert = ({ newDoc }) => ({ newDoc }),
    preSaveUpdate = ({ prevDoc, newDoc }) => ({ prevDoc, newDoc }),
    afterSaveInsert = ({ newDoc }) => ({ newDoc }),
    afterSaveUpdate = ({ prevDoc, newDoc }) => ({ prevDoc, newDoc })
    } = {}
) => {

    return {
        insertOne: insertOne(schema, db, customPipes),
        validateUpdate: async (key, value) => {
            const prevDoc = await getPrevDoc(key)

            return pipe(
                validateUpdate({ schema, prevDoc }),
            )({ prevDoc, newDoc: value })
        }
    }
}