const R = require('ramda')
const generateAutoID = require('./generateAutoID')
// const isArray = require('./typesNodes/isArray')
const isObject = require('./typesNodes/isObject')
const isFunction = require('./typesNodes/isFunction')

module.exports = objectIterator
function isArray({ key, value, schemaValidator, transformation, prevDoc, newDoc }) {
    // console.log('transformation[0]::', transformation[0])

    schemaValidator = transformation[0]
    return value.map(
        element => {
            const { doc, schema } = generateAutoID({ doc: element, schemaValidator })
            return objectIterator({ element: doc, schemaValidator: schema, prevDoc, newDoc })
            // return objectIterator({ element, schemaValidator, prevDoc, newDoc })

        }
    )

}

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





