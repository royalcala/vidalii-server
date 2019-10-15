const R = require('ramda')
// const uuidv4 = require('uuid/v4')
// const id1 = uuidv4()
// const fxValuator = (fx, value) => {
//     return fx(value)
// }
// const ifNoTExistInObj1 = [({ valueNextObj1 }) => R.isNil(valueNextObj1), ({ acc }) => acc]
// const ifExistInObj1 =
//     ({ acc, valueNextObj1, nameNextObj2, valueNextObj2 }) => ({
//         ...acc,
//         [nameNextObj2]: R.cond([
//             [R.is(Function), () => fxValuator(valueNextObj1, valueNextObj2)],
//             [R.is(Array), () => {
//                 return [recursive({
//                     obj1: valueNextObj1[0],
//                     obj2: valueNextObj2[0]
//                 })]
//             }],
//             [R.is(Object), () => {
//                 return recursive({
//                     obj1: valueNextObj1,
//                     obj2: valueNextObj2
//                 })
//             }]
//         ])(valueNextObj1)
//     })

//
const addID = schema => R.pipe(
    R.ifElse(
        R.has('_id'),
        x => x,
        x => ({
            _id: () => '',
            ...x
        })
        // R.assoc('_id', () => '')
    )
)(schema)

const searchForAddIdInArray = (schema) => R.pipe(
    R.toPairs,
    R.reduce(
        (acc, [nameNextObj, valueNextObj]) => ({
            ...acc,
            [nameNextObj]: R.cond([
                [R.is(Function), () => valueNextObj],
                [R.is(Array), () => {
                    return [
                        addID(searchForAddIdInArray(valueNextObj[0]))
                    ]
                }],
                [R.is(Object), () => {
                    return searchForAddIdInArray(valueNextObj)
                }]
            ])(valueNextObj)
        }),
        {})
)(schema)


const addIdAndRevInRoot = schema => R.pipe(
    R.ifElse(
        R.has('_rev'),
        x => x,
        x => ({
            _rev: () => '',
            ...x
        })
        // R.assoc('_rev', () => '')
    ),
    R.ifElse(
        R.has('_id'),
        x => x,
        x => ({
            _id: () => '',
            ...x
        })
        // R.assoc('_id', () => '')
    )
)(schema)

module.exports = ({ schema }) => {

    const extendedSchema = R.pipe(
        addIdAndRevInRoot,
        searchForAddIdInArray
    )(schema)
    // console.log('extendedSchema::', extendedSchema)

    return extendedSchema
}