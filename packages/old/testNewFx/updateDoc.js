const R = require('ramda')
console.clear()
console.log('start testNewFx')


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

const updateDocWithID = ({ prevDoc, newDoc, idName }) => {
    const unFoldPrevDoc = changeToObjectAllArrays({ idName, doc: prevDoc })
    const unFoldNewDoc = changeToObjectAllArrays({ idName, doc: newDoc })
    const merged = R.mergeDeepRight(unFoldPrevDoc, unFoldNewDoc)
    const foldMerged = changeToArrayAllObjects({ doc: merged })

    console.log('unFoldPrevDoc::', unFoldPrevDoc)
    console.log('unFoldNewDoc::', unFoldNewDoc)
    console.log('merged:', merged)
    return foldMerged
}

const prevDoc = {
    _id: 1,
    a: 1,
    b: [
        { _id: 1, a: 1 },
        { _id: 2, a: 1 },
        { _id: 3, a: 1, b: 1, sub_b: [{ _id: 1, a: 1, b: 1 }] },
    ]
}

const newDoc = {
    _id: 1,
    b: [{ _id: 3, a: 2, sub_b: [
        { _id: 1, a: 2 },
        { _id: 2, a: 2 }
    ] }]
}
console.log('prevDoc:', prevDoc)
console.log('newDoc:', newDoc)
console.log('result:',
    updateDocWithID({ prevDoc, newDoc, idName: '_id' })

)