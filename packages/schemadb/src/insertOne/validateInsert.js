import { VIDALIILEAF } from '../leaf'
import { cond, ifElse, hasPath } from 'ramda'



// const writeRecursive = ({ recursive, result, key, pSchema, pNewDoc }) => result[key] = recursive({
//     pSchema: pSchema[key],
//     pNewDoc: pNewDoc[key]
// })

// const checkIfIsArray = ifElse(
//     ({ pSchema, key }) => pSchema[key].isArray,
//     ({ key, pSchema, pNewDoc }) => {
//         // i = pNewDoc[key].lenght;
//         // while (i--) {
//         //     // do somthing
//         // }
//         // result[key] = [
//         //     iterateInNewDoc({
//         //         pSchema: pSchema[key][0],
//         //         pNewDoc: pNewDoc[key][0]
//         //     })
//         // ]
//     },
//     writeRecursive
// )



// const writeSimple = ({ pSchema, key, pNewDoc, result }) => result[key] = pSchema[key].insert({ newValue: pNewDoc[key] })
// const hasSchemaVidaliiLeaf = ifElse(
//     ({ pSchema, key }) => pSchema[key].hasOwnProperty(VIDALIILEAF),
//     writeSimple,
//     checkIfIsArray
// )

// const hasSchemaNewDocPropertie = ifElse(
//     ({ key, pSchema }) => pSchema.hasOwnProperty(key),
//     hasSchemaVidaliiLeaf,
//     () => ''
// )
// hasSchemaNewDocPropertie({
//     result,
//     key,
//     pNewDoc,
//     pSchema,
//     recursive: iterateInNewDoc,
//     // recursive: () => iterateInNewDoc({
//     //     pSchema: pSchema[key],
//     //     pNewDoc: pNewDoc[key]
//     // }),

// })
export default schema => ({ newDoc }) => {
    // throw  'this is the error' 
    const iterateInNewDoc = ({ pSchema, pNewDoc }) => {
        let result = {}
        let key
        for (key in pNewDoc) {
            if (pSchema.hasOwnProperty(key)) {
                if (pSchema[key].hasOwnProperty(VIDALIILEAF)) {
                    result[key] = pSchema[key].insert({ newValue: pNewDoc[key] })
                } else {
                    if (pSchema[key].isArray) {
                        let i = 0
                        let size = arr.length
                        for (i; i < size; i++) {
                            result[key] = [
                                iterateInNewDoc({
                                    pSchema: pSchema[key][0],
                                    pNewDoc: pNewDoc[key][0]
                                })
                            ]
                        }
                    } else
                        result[key] = iterateInNewDoc({
                            pSchema: pSchema[key],
                            pNewDoc: pNewDoc[key]
                        })
                }
            }
        }
        return result
    }
    let result = iterateInNewDoc({ pSchema: schema, pNewDoc: newDoc })
    return { newDoc: result }
}