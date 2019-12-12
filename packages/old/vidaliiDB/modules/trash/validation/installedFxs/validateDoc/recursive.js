const R = require('ramda')

const fxValuator = (fx, value) => {
    return fx(value)
}
const ifNoTExistInObj1 = [({ valueNextObj1 }) => R.isNil(valueNextObj1), ({ acc }) => acc]
const ifExistInObj1 =
    ({ acc, valueNextObj1, nameNextObj2, valueNextObj2 }) => ({
        ...acc,
        [nameNextObj2]: R.cond([
            [R.is(Function), () => fxValuator(valueNextObj1, valueNextObj2)],
            [R.is(Array), () => {
                return [recursive({
                    obj1: valueNextObj1[0],
                    obj2: valueNextObj2[0]
                })]
            }],
            [R.is(Object), () => {
                return recursive({
                    obj1: valueNextObj1,
                    obj2: valueNextObj2
                })
            }]
        ])(valueNextObj1)
    })

const recursive = ({ obj1, obj2 }) => {
    let listObj2 = R.toPairs(obj2)

    return R.reduce(
        (acc, [nameNextObj2, valueNextObj2]) => {
            let valueNextObj1 = obj1[nameNextObj2]
            return R.cond([
                ifNoTExistInObj1,
                [R.T, ifExistInObj1]
            ])({
                acc,
                valueNextObj1,
                nameNextObj2,
                valueNextObj2
            })
        },
        {},
        listObj2)
}


module.exports = (schema, newDoc) => {
    // const {
    //     extend: {
    //         beforeValidate: []
    //     }
    // } = options

    const result = recursive({
        obj1: schema,
        obj2: newDoc
    })
    return result
    // return R.pipe(R.mergeAll)(result)
}