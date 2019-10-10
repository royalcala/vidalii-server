//dont work, needs to be in the same file of objectIterator because them call each other

// const R = require('ramda')
// const objectIterator = require('../objectIterator')
// const generateAutoID = require('../generateAutoID')



// const isArray = ({ key, value, schemaValidator, transformation, prevDoc, newDoc }) => {
//     // console.log('transformation[0]::', transformation[0])
//     console.log('objectIterator', generateAutoID)
//     schemaValidator = transformation[0]
//     return value.map(
//         element => {
//             const { doc, schema } = generateAutoID({ doc: element, schemaValidator })
//             return objectIterator({ element: doc, schemaValidator: schema, prevDoc, newDoc })
//             // return objectIterator({ element, schemaValidator, prevDoc, newDoc })

//         }
//     )

// }

// module.exports = isArray