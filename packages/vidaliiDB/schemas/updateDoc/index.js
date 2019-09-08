const AllToObjet = require('./convertArraysInObject')
const mPaths = require('./mergePaths')
const R = require('ramda')
const restructure = require('./restructureObject')
module.exports = main


function main({ idName, prevDoc, newDoc }) {
    var { object: prevObj, arrayPaths: prevPath } = AllToObjet({ idName, object: prevDoc })
    var { object: newObj, arrayPaths: newPath } = AllToObjet({ idName, object: newDoc })

    var mergedObjects = R.mergeDeepRight(prevObj, newObj)
    var mergedPaths = mPaths({ path1: prevPath, path2: newPath })

    var restructured = restructure({ idName, object: mergedObjects, paths: mergedPaths })

    return restructured
}