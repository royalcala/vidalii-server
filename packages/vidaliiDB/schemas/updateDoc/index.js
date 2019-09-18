const AllToObjet = require('./convertArraysInObject')
const mPaths = require('./mergePaths')
const R = require('ramda')
const restructure = require('./restructureObject')
module.exports = main

// idName: means the name of the field that containst the id for the document,
// and for eacht of the rows inside in an array.
// pouchb the id name is _id

function main({ idName, prevDoc, newDoc }) {
    var { object: prevObj, arrayPaths: prevPath } = AllToObjet({ idName, object: prevDoc })
    var { object: newObj, arrayPaths: newPath } = AllToObjet({ idName, object: newDoc })

    var mergedObjects = R.mergeDeepRight(prevObj, newObj)
    var mergedPaths = mPaths({ path1: prevPath, path2: newPath })

    var restructured = restructure({ idName, object: mergedObjects, paths: mergedPaths })
    console.log('restructure:::',restructured)
    return restructured
}