import { pipe } from 'ramda'
const VIDALIILEAFT = 'vidaliiLeaf'



const validateInsertSchema = schema => ({ newDoc }) => {
    // let result = {}
    const iterateInNewDoc = ({ pSchema, pNewDoc }) => {
        let result = {}
        let key
        for (key in pNewDoc) {
            if (pSchema.hasOwnProperty(key)) {
                if (pSchema[key].hasOwnProperty(VIDALIILEAFT)) {
                    result[key] = pSchema[key].insert({ newValue: pNewDoc[key] })
                } else
                    result[key] = iterateInNewDoc({
                        pSchema: pSchema[key],
                        pNewDoc: pNewDoc[key]
                    })
            }
        }
        return result
    }
    let result = iterateInNewDoc({ pSchema: schema, pNewDoc: newDoc })    
    return { newDoc: result }
}

const getPrevDoc = async key => {

}

export default (schema, {
    preValidateInsert = ({ newDoc }) => ({ newDoc }),
    preValidateUpdate = ({ prevDoc, newDoc }) => ({ newDoc }),
    preSaveInsert = ({ newDoc }) => ({ newDoc }),
    preSaveUpdate = ({ prevDoc, newDoc }) => ({ prevDoc, newDoc }),
    afterSaveInsert = ({ newDoc }) => ({ newDoc }),
    afterSaveUpdate = ({ prevDoc, newDoc }) => ({ prevDoc, newDoc })
} = {}) => {

    return {
        schema,
        validateInsert: value => pipe(
            // preValidateInsert,
            preSaveInsert,
            validateInsertSchema(schema),
            afterSaveInsert
        )({ newDoc: value }),
        validateUpdate: async (key, value) => {
            const prevDoc = await getPrevDoc(key)

            return pipe(

            )({ prevDoc, newDoc: value })
        }
    }
}