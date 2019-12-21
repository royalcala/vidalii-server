import { json as jsoncodecs } from '@vidalii/encodingdb/src/codecs'
import { cond, equals } from 'ramda';
let lexint = require('lexicographic-integer');

const decodeString = valueField => valueField.split('.')[0]

const decodeInt = valueField => {
    let array = valueField.split('.')
    return lexint.unpack(array[0])
}
const decodeFloat = valueField => {
    // 0c.5.flo
    let array = valueField.split('.')
    let rInt = lexint.unpack(array[0])
    return Number(rInt + '.' + array[1])
}

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
                return keyEncodingConcat({
                    nameField,
                    valueField: valueField + '.str',
                    idDoc
                })
            else if (Number.isInteger(valueField)) // is int
                return keyEncodingConcat({
                    nameField,
                    valueField: lexint.pack(valueField, 'hex') + '.int',
                    idDoc
                })
            else if (valueField % 1 !== 0) //is float
                return keyEncodingConcat({
                    nameField,
                    valueField: encodingFloat({ valueField }) + '.flo',
                    idDoc
                })
            //is text full search
        },
        decode: buff => {
            let [nameField, valueField, idDoc] = buff.toString('utf8').split('!!')
            let typeValueField = valueField.substring(valueField.length, valueField.length - 3)
            return {
                nameField,
                valueField: cond([
                    [equals('str'), () => decodeString(valueField)],
                    [equals('int'), () => decodeInt(valueField)],
                    [equals('flo'), () => decodeFloat(valueField)],
                ])(typeValueField),
                idDoc
            }
        }
    },
    valueEncoding: jsoncodecs.valueEncoding
}
