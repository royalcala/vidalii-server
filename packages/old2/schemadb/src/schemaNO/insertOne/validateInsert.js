import { vidaliiLeaf } from '../leaf'
export default schema => ({ newDoc }) => {
    // throw  'this is the error' 
    const iterateInNewDoc = ({ pSchema, pNewDoc }) => {
        let result = {}
        let key
        for (key in pNewDoc) {
            if (pSchema.hasOwnProperty(key)) {
                if (pSchema[key].hasOwnProperty(vidaliiLeaf)) {
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