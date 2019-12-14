import { VIDALIILEAF } from '../leaf'
import { ifElse } from 'ramda'



const writeRecursive = ({ iterateInNewDoc, result, key, pSchema, pNewDoc }) => result[key] = iterateInNewDoc({
    pSchema: pSchema[key],
    pNewDoc: pNewDoc[key]
})

const checkIfpSchemaIsArray = ifElse(
    ({ pSchema, key }) => Array.isArray(pSchema[key]),
    ({ key, pSchema, pNewDoc, result, iterateInNewDoc }) => {
        let index = 0
        let size = pNewDoc[key].length
        result[key] = []
        for (index; index < size; index++) {
            result[key].push(
                iterateInNewDoc({
                    pSchema: pSchema[key][0],
                    pNewDoc: pNewDoc[key][index]
                })
            )
        }
    },
    writeRecursive
)



const writeSimple = ({ pSchema, key, pNewDoc, result }) => result[key] = pSchema[key].insert({ newValue: pNewDoc[key] })
const hasSchemaVidaliiLeaf = ifElse(
    ({ pSchema, key }) => pSchema[key].hasOwnProperty(VIDALIILEAF),
    writeSimple,
    checkIfpSchemaIsArray
)

const hasSchemaNewDocPropertie = ifElse(
    ({ key, pSchema }) => pSchema.hasOwnProperty(key),
    hasSchemaVidaliiLeaf,
    () => ''
)

export default schema => ({ newDoc }) => {
    // throw  'this is the error' 
    const iterateInNewDoc = ({ pSchema, pNewDoc }) => {
        let result = {}
        let key
        for (key in pNewDoc) {
            hasSchemaNewDocPropertie({
                result,
                key,
                pNewDoc,
                pSchema,
                iterateInNewDoc
            })
            // if (pSchema.hasOwnProperty(key)) {
            //     if (pSchema[key].hasOwnProperty(VIDALIILEAF)) {
            //         result[key] = pSchema[key].insert({ newValue: pNewDoc[key] })
            //     } else {
            //         if (pSchema[key].isArray) {
            //             let index = 0
            //             let size = pNewDoc[key].length
            //             result[key] = []
            //             for (index; index < size; index++) {
            //                 result[key].push(
            //                     iterateInNewDoc({
            //                         pSchema: pSchema[key][0],
            //                         pNewDoc: pNewDoc[key][index]
            //                     })
            //                 )
            //             }
            //         } else
            //             result[key] = iterateInNewDoc({
            //                 pSchema: pSchema[key],
            //                 pNewDoc: pNewDoc[key]
            //             })
            //     }
            // }
        }
        return result
    }
    let result = iterateInNewDoc({ pSchema: schema, pNewDoc: newDoc })
    return { newDoc: result }
}