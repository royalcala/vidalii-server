const R = require('ramda')
const uuidv4 = require('uuid/v4')

function objectIterator({ element, schemaValidator, prevDoc, newDoc }) {
    // ({ key, value, schemaValidator, transformation, prevDoc, newDoc })
    return Object.entries(element).reduce(
        (acc, [key, value]) => {
            if (schemaValidator.hasOwnProperty(key)) {
                let transformation = schemaValidator[key]
                // let prevValue = prevDoc === null ? null : prevDoc.hasOwnProperty(key) ? prevDoc[key] : null
                // console.log('key:', key, 'value:', value)
                let data = R.cond([
                    [({ transformation }) => R.is(Function, transformation), isFunction],
                    [({ transformation }) => R.is(Array, transformation), isArray],
                    [({ transformation }) => R.is(Object, transformation), isObject]
                ])({ key, value, schemaValidator, transformation, prevDoc, newDoc })
                let result = R.assoc(key, data, acc)
                // console.log('result1:', result)
                return result
            } else {
                return acc
            }

        }, {})
}

function isArray({ key, value, schemaValidator, transformation, prevDoc, newDoc }) {
    // console.log('transformation[0]::', transformation[0])

    schemaValidator = transformation[0]
    return value.map(
        element => {
            return objectIterator({ element, schemaValidator, prevDoc, newDoc })
        }
    )

}
function isObject({ key, value, schemaValidator, transformation, prevDoc, newDoc }) {

    schemaValidator = transformation//next object
    return objectIterator({ element: value, schemaValidator, prevDoc, newDoc })
}

function isFunction({ transformation, value, prevDoc, newDoc }) {

    return transformation({ newValue: value, prevDoc, newDoc })
}


function validator({ schemaValidator, prevDoc = null, newDoc }) {


    return objectIterator({ element: newDoc, schemaValidator, prevDoc, newDoc })
}


module.exports = validator