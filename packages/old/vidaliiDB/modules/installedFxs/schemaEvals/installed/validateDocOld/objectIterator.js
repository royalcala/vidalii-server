const R = require('ramda')
const generateAutoID = require('./generateAutoID')
// const isArray = require('./typesNodes/isArray')
// const isObject = require('./typesNodes/isObject')
// const isFunction = require('./typesNodes/isFunction')
module.exports = objectIterator

function isFunction({ key, transformation, value, prevDoc, newDoc }) {
    const { fx, type, isNodeType, } = transformation        
    return fx({ nameField: key, newValue: value, prevDoc, newDoc })
}

function isObject({ key, value, schemaValidator, transformation, prevDoc, newDoc }) {
    console.log('transformation::', transformation)
    console.log('objectIterator:::', objectIterator)
    schemaValidator = transformation//next object
    return objectIterator({ element: value, schemaValidator, prevDoc, newDoc })
}

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
    return Object.entries(element).reduce(
        (acc, [key, value]) => {
            if (schemaValidator.hasOwnProperty(key)) {
                let transformation = schemaValidator[key]
                let data = R.cond([
                    // [({ transformation }) => R.is(Function, transformation), isFunction],
                    [({ transformation }) => R.has('isNodeType', transformation), isFunction],
                    [({ transformation }) => R.is(Array, transformation), isArray],
                    [({ transformation }) => R.is(Object, transformation), isObject]
                ])({ key, value, schemaValidator, transformation, prevDoc, newDoc })
                let result = R.assoc(key, data, acc)
                return result
            } else {
                return acc
            }

        }, {})
}
// function objectIterator({ element, schemaValidator, prevDoc, newDoc }) {
//     return Object.entries(element).reduce(
//         ({ accFinal, accErrors }, [key, value]) => {
//             if (schemaValidator.hasOwnProperty(key)) {
//                 let transformation = schemaValidator[key]
//                 let data = R.cond([
//                     // [({ transformation }) => R.is(Function, transformation), isFunction],
//                     [({ transformation }) => R.has('isNodeType', transformation), isFunction],
//                     [({ transformation }) => R.is(Array, transformation), isArray],
//                     [({ transformation }) => R.is(Object, transformation), isObject]
//                 ])({ key, value, schemaValidator, transformation, prevDoc, newDoc })
//                 let result = R.assoc(key, data, accFinal)
//                 return {
//                     accFinal: result,
//                     accErrors
//                 }
//             } else {
//                 console.log(key)
//                 console.log(accErrors)
//                 return {
//                     accFinal,
//                     accErrors: accErrors.push({
//                         typeError: 'Path not found in the Schema Validator',
//                         key,
//                         value
//                     })
//                 }
//             }

//         }, { accFinal: {}, accErrors: [] })
// }





