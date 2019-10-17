const R = require('ramda')

const changeToObjectAllArrays = ({ idName, doc, pointArrayName = '_isArray' }) => {

    const recursive = (schema) => R.pipe(
        R.toPairs,
        R.reduce(
            (acc, [nameNextObj, valueNextObj]) => {
                return {
                    ...acc,
                    [nameNextObj]: R.cond([[
                        R.is(Array), R.pipe(
                            R.map(
                                (oneDoc) => R.ifElse(
                                    R.has(idName),
                                    x => ({ [x[idName]]: x }),
                                    () => {
                                        throw new Error(`Update Error.
                                        Doesnt exist idField:${idName} 
                                        on doc:${JSON.stringify(doc)}
                                        on row:${JSON.stringify(oneDoc)}`)
                                    }
                                )(oneDoc)
                            ),
                            R.mergeAll,
                            o => ({ [pointArrayName]: o }),
                            recursive
                        )
                    ],
                    [R.is(Object), () => recursive(valueNextObj)],
                    [R.T, () => valueNextObj]
                    ])(valueNextObj)
                }
            },
            {})
    )(schema)

    return recursive(doc)
}
module.exports = changeToObjectAllArrays