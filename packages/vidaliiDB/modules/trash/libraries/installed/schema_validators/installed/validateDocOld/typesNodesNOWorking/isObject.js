const objectIterator = require('../objectIterator')
module.exports = isObject

function isObject({ key, value, schemaValidator, transformation, prevDoc, newDoc }) {
    // console.log('transformation::', transformation)
    // console.log('objectIterator:::',objectIterator)
    schemaValidator = transformation//next object
    return objectIterator({ element: value, schemaValidator, prevDoc, newDoc })
}