
module.exports = isObject

function isObject({ key, value, schemaValidator, transformation, prevDoc, newDoc }) {

    schemaValidator = transformation//next object
    return objectIterator({ element: value, schemaValidator, prevDoc, newDoc })
}