const R = require('ramda')

module.exports = main


const convertToArray = ({ idName, obj }) => R.pipe(
    R.toPairs,
    R.reduce((acc, [key, value]) => R.append({ [idName]: key, ...value }, acc)
        , [])
)(obj)



function main({ idName, object, paths }) {

    var result = paths.reduce((acc, actualPath) => {


        
        return R.assocPath(
            actualPath,
            convertToArray({ idName, obj: R.path(actualPath, acc) }),
            acc)
    }, object)

    // var result = R.pipe(
    //     R.reduce(
    //         // (acc, actualPath) => R.assocPath(actualPath, R.path, {a: {b: {c: 0}}}), object)
    // )(paths)
    return { object, paths, result }
}







