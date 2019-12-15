import { VIDALIILEAF } from '../leaf'
import { ifElse } from 'ramda'

const writeRecursive = ({ iterateInNewDoc, result, key, schema, newDoc }) => result[key] = iterateInNewDoc({
    schema: schema[key],
    newDoc: newDoc[key]
})

const checkIfSchemaKeyIsArray = ifElse(
    ({ schema, key }) => Array.isArray(schema[key]),
    ({ key, schema, newDoc, result, iterateInNewDoc }) => {
        let index = 0
        let size = newDoc[key].length
        result[key] = []
        for (index; index < size; index++) {
            result[key].push(
                iterateInNewDoc({
                    schema: schema[key][0],
                    newDoc: newDoc[key][index]
                })
            )
        }
    },
    writeRecursive
)

const writeSimple = ({ schema, key, newDoc, result }) => result[key] = schema[key].insert({ newValue: newDoc[key] })
// const writeSimple = ({ schema, key, newDoc, result }) => result[key] = schema[key].insert({ newValue: newDoc[key] })
const hasSchemaAPropVidaliiLeaf = ifElse(
    ({ schema, key }) => schema[key].hasOwnProperty(VIDALIILEAF),
    writeSimple,
    checkIfSchemaKeyIsArray
)

const hasSchemaNewDocPropertie = ifElse(
    ({ key, schema }) => schema.hasOwnProperty(key),
    hasSchemaAPropVidaliiLeaf,
    () => null
)

const iterateInNewDoc = ({ schema, newDoc }) => {
    let result = {}
    let key
    for (key in newDoc) {
        hasSchemaNewDocPropertie({
            result,
            key,
            newDoc,
            schema,
            iterateInNewDoc
        })

    }
    return result
}
export default schema => ({ newDoc }) => {
    // throw  'this is the error' 
    let resultNewDoc = iterateInNewDoc({ schema, newDoc })
    return resultNewDoc
}

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