import { VIDALIILEAF } from '../leaf'
import { ifElse } from 'ramda'

const writeValueUpdate = ({ schema, key, result, prevValue, prevDoc, newDoc }) => {
    return result[key] = schema[key].update({
        prevDoc,
        prevValue: prevValue.hasOwnProperty(key) ? prevValue[key] : {},
        newDoc,
        newValue: newDoc[key]
    })
}
const writeValueInsert = ({ schema, key, newDoc, result }) => {
    return result[key] = schema[key].insert({ newDoc, newValue: newDoc[key] })
}

const writeValueRecursive = ({ iterateInNewDoc, result, key, schema, prevDoc, newDoc }) => {
    result[key] = iterateInNewDoc({
        prevDoc,
        schema: schema[key],
        newDoc: newDoc[key]
    })
    return result[key]

}
const writeValueInArrayRecursive = ({ key, schema, prevValue, prevDoc, newDoc, result, iterateInNewDoc }) => {
    let index = 0
    let size = newDoc[key].length
    result[key] = []    
    for (index; index < size; index++) {
        result[key].push(
            iterateInNewDoc({
                prevDoc,
                prevValue: (prevValue.hasOwnProperty(key) && prevValue[key].hasOwnProperty(index)) ? prevValue[key][index] : {},
                schema: schema[key][0],
                newDoc: newDoc[key][index]
            })
        )
    }
}
const iterateInNewDoc = hasSchemaNewDocPropertie => ({ schema, prevDoc, newDoc }) => {
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
            iterateInNewDoc: iterateInNewDoc(hasSchemaNewDocPropertie)
        })

    }
    return result
}


export const validateUpdate = ({ schema }) => ({ prevDoc = {}, newDoc }) => {

    return iterateInNewDoc(
        ifElse(
            ({ key, schema }) => schema.hasOwnProperty(key),
            ifElse(
                ({ schema, key }) => schema[key].hasOwnProperty(VIDALIILEAF),
                writeValueUpdate,
                ifElse(
                    ({ schema, key }) => Array.isArray(schema[key]),
                    writeValueInArrayRecursive,
                    writeValueRecursive
                )
            ),
            () => null//omit the key of the newDoc
        )
    )({ schema, prevDoc, newDoc })
}

export const validateInsert = ({ schema }) => ({ prevDoc = {}, newDoc }) => {

    return iterateInNewDoc(
        ifElse(
            ({ key, schema }) => schema.hasOwnProperty(key),
            ifElse(
                ({ schema, key }) => schema[key].hasOwnProperty(VIDALIILEAF),
                writeValueInsert,
                ifElse(
                    ({ schema, key }) => Array.isArray(schema[key]),
                    writeValueInArrayRecursive,
                    writeValueRecursive
                )
            ),
            () => null//omit the key of the newDoc
        )
    )({ schema, prevDoc, newDoc })
}