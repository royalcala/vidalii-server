const R = require('ramda')
// console.clear()
// console.log('start testNewFx')
const changeToObjectAllArrays = require('./changeToObject')
const changeToArrayAllObjects = require('./changeToArray')

const updateDocWithID = ({ prevDoc, newDoc, idName = '_id' }) => {
    const unFoldPrevDoc = changeToObjectAllArrays({ idName, doc: prevDoc })
    const unFoldNewDoc = changeToObjectAllArrays({ idName, doc: newDoc })
    const merged = R.mergeDeepRight(unFoldPrevDoc, unFoldNewDoc)
    const foldMerged = changeToArrayAllObjects({ doc: merged })

    // console.log('unFoldPrevDoc::', unFoldPrevDoc)
    // console.log('unFoldNewDoc::', unFoldNewDoc)
    // console.log('merged:', merged)
    return foldMerged
}
module.exports = updateDocWithID

// const prevDoc = {
//     _id: 1,
//     a: 1,
//     b: [
//         { _id: 1, a: 1 },
//         { _id: 2, a: 1 },
//         { _id: 3, a: 1, b: 1, sub_b: [{ _id: 1, a: 1, b: 1 }] },
//     ]
// }

// const newDoc = {
//     _id: 1,
//     b: [{ _id: 3, a: 2, sub_b: [
//         { _id: 1, a: 2 },
//         { _id: 2, a: 2 }
//     ] }]
// }
// console.log('prevDoc:', prevDoc)
// console.log('newDoc:', newDoc)
// console.log('result:',
//     updateDocWithID({ prevDoc, newDoc, idName: '_id' })

// )