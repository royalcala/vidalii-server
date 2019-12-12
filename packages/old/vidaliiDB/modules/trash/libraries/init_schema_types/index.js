const R = require('ramda')
const initTypes = require('./typesResults')
// console.log(initTypes.isFx)
// const isNodeType = {
//     isNodeType: true
// }

module.exports = libraries => R.pipe(
    x => x.schema_types,
    R.toPairs,
    R.map(
        ([nameType, vType]) => ({
            [nameType]: R.cond([
                initTypes.isFx,
                initTypes.isObject
            ])(
                vType('sendLibrariesHere')
            )
        })
    ),
    R.mergeAll,
    x => ({
        ...libraries,
        schema_types: { ...x }
    })
)(libraries)