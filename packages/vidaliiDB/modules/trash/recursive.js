const R = require('ramda')
var globalData = {
    fx_id: null,
    fx_rev: null
}
const initGlobal = ({ fx_id, fx_rev }) => {
    globalData.fx_id = fx_id
    globalData.fx_rev = fx_rev
}

const addID = schema => R.pipe(
    R.ifElse(
        R.has('_id'),
        x => x,
        x => ({
            _id: globalData.fx_id,
            ...x
        })
        // R.assoc('_id', () => '')
    )
)(schema)

const searchForAddIdInArray = (schema) => {
    
    return R.cond([
        [R.propEq('isNodeType', true), () => schema],
        [R.T, R.pipe(
            R.toPairs,
            R.reduce(
                (acc, [nameNextObj, valueNextObj]) => ({
                    ...acc,
                    [nameNextObj]: R.cond([
                        // [R.is(Function), () => valueNextObj],
                        [R.is(Array), () => {
                            return [
                                addID(searchForAddIdInArray(valueNextObj[0]))
                            ]
                        }],
                        [R.is(Object), () => {
                            return searchForAddIdInArray(valueNextObj)
                        }],
                        [R.T,
                        () => valueNextObj
                        ]
                    ])(valueNextObj)
                }),
                {})
        )]
    ])(schema)
}



const addIdAndRevInRoot = schema => R.pipe(
    R.ifElse(
        R.has('_rev'),
        x => x,
        x => ({
            _rev: globalData.fx_rev,
            ...x
        })
        // R.assoc('_rev', () => '')
    ),
    R.ifElse(
        R.has('_id'),
        x => x,
        x => ({
            _id: globalData.fx_id,
            ...x
        })
        // R.assoc('_id', () => '')
    )
)(schema)

module.exports = ({ schema, fx_id, fx_rev }) => {
    // console.log('fx_id::', fx_id)
    initGlobal({ fx_id, fx_rev })

    const extendedSchema = R.pipe(
        addIdAndRevInRoot,
        searchForAddIdInArray
    )(schema)
    // console.log('extendedSchema::', extendedSchema)

    return extendedSchema
}