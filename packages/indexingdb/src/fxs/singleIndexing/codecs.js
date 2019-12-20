import { json as jsoncodecs, utf8 } from '@vidalii/encodingdb/src/codecs'
let lexint = require('lexicographic-integer');


const keyEncodingConcat = ({ nameField, valueField, idDoc }) => {
    return nameField.concat('!!', valueField, '!!', idDoc)
}
const encodingFloat = ({ valueField }) => {
    let rPartInt = Math.floor(valueField)
    let leftPartDecimal = valueField - rPartInt
    let leftPartDecimalToString = leftPartDecimal.toString().split(".").pop()
    return lexint.pack(rPartInt, 'hex').concat('.', leftPartDecimalToString)
}

export default {
    keyEncoding: {
        encode: ({ nameField, valueField, idDoc }) => {
            if (typeof valueField === 'string') // is string
                return keyEncodingConcat({ nameField, valueField, idDoc })
            else if (Number.isInteger(valueField)) // is int
                return keyEncodingConcat({
                    nameField,
                    valueField: lexint.pack(valueField, 'hex'),
                    idDoc
                })
            else if (valueField % 1 !== 0) //is float
                return keyEncodingConcat({
                    nameField,
                    valueField: encodingFloat({ valueField }),
                    idDoc
                })
        },
        decode: buff => {                      
            let [nameField, valueField, idDoc] = buff.toString('utf8').split('!!')
            return {
                nameField,
                valueField,
                idDoc
            }
        }        
    },
    valueEncoding: jsoncodecs.valueEncoding
}
