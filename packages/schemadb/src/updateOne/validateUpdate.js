import { VIDALIILEAF } from '../leaf'
import { ifElse } from 'ramda'

const writeRecursive = ({ iterateInNewDoc, result, key, schema, prevValue, newDoc }) => result[key] = iterateInNewDoc({
    prevDoc,
    prevValue: prevValue[key],
    schema: schema[key],
    newDoc: newDoc[key]
})

const checkIfSchemaKeyIsArray = ifElse(
    ({ schema, key }) => Array.isArray(schema[key]),
    ({ key, schema, prevValue, newDoc, result, iterateInNewDoc }) => {
        let index = 0
        let size = newDoc[key].length
        result[key] = []
        for (index; index < size; index++) {
            result[key].push(
                iterateInNewDoc({
                    prevDoc,
                    prevValue: prevValue[key][index],
                    schema: schema[key][0],
                    newDoc: newDoc[key][index]
                })
            )
        }
    },
    writeRecursive
)


const writeSimple = ({ schema, key, prevValue, prevDoc, newDoc, result }) => {
    // console.log('prevValue[key]::', prevValue[key])
    // console.log('key::', key)
    // console.log('prevValue::', prevValue[key])
    // console.log('newDoc::', newDoc[key])
    return result[key] = schema[key].update({
        prevDoc,
        prevValue: prevValue[key],
        newValue: newDoc[key]
    })
}
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

const iterateInNewDoc = ({ schema, prevDoc, newDoc }) => {
    let result = {}
    let key
    for (key in newDoc) {
        hasSchemaNewDocPropertie({
            result,
            key,
            prevDoc,
            prevValue: prevDoc,
            newDoc,
            schema,
            iterateInNewDoc
        })

    }
    return result
}
export default schema => ({ prevDoc, newDoc }) => {
    let resultNewDoc = iterateInNewDoc({ prevDoc, schema, newDoc })
    return resultNewDoc
}