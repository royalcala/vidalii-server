const R = require('ramda')

const changeToArrayAllObjects = ({ doc, pointArrayName = '_isArray' }) => {

    const recursive = (schema) => R.pipe(
        R.toPairs,
        R.reduce(
            (acc, [nameNextObj, valueNextObj]) => R.ifElse(
                R.equals(pointArrayName),
                () => R.pipe(
                    R.toPairs,
                    R.map(
                        ([k, v]) => recursive(v)
                    )
                )(valueNextObj),
                () => ({
                    ...acc,
                    [nameNextObj]: R.cond([
                        [R.is(Object), () => recursive(valueNextObj)],
                        [R.T, () => valueNextObj]
                    ])(valueNextObj)
                })
            )(nameNextObj),
            {})
    )(schema)

    return recursive(doc)
}

module.exports = changeToArrayAllObjects