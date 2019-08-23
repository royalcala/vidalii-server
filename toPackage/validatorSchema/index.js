const R = require('ramda')
const generateAutoID = require('./generateAutoID')
const objectIterator = require('./objectIterator')




function validator({ schemaValidator, prevDoc = null, newDoc }) {
    const { doc, schema } = generateAutoID({ doc: newDoc, schemaValidator })
    return objectIterator({ element: doc, schemaValidator: schema, prevDoc, newDoc: doc })
}


module.exports = validator




// const prevDoc = {
//     a: 1,
//     b: 2,
//     // c: { d: 1, f: 2 }
// }

// var newDoc = {
//     a: 2,
//     b: 3,
//     c: { d: 1, f: 2 },
//     f: { a: { a: 1 } }
// }

// var newDoc2 = {
//     a: 2,
//     b: 1,
//     c: { d: 1, f: 2 },
//     d: [{ a: 1, b: 2 }, { a: 2, b: 33 }],
//     f: { a: { a: 1 } }
// }

// var result = validator({
//     schemaValidator,
//     prevDoc,
//     // newDoc,
//     newDoc: newDoc2
// })

// console.log('RESULT:', result)
