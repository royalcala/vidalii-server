const R = require('ramda')

const firstUpper = string => R.pipe(
    R.trim,
    R.splitAt(1),
    ([first, rest]) => R.concat(R.toUpper(first), R.toLower(rest))
)(string)

const parentNotNull = [
    R.T,
    ({ parent, child }) => parent + '_' + child
]

const parentIsNull = [
    ({ parent }) => parent === null || parent === '',
    ({ child }) => firstUpper(child)
]

// module.exports = R.pipe(
//     R.trim,
//     R.splitAt(1),
//     ([first, rest]) => R.concat(R.toUpper(first), R.toLower(rest))
// )

module.exports = ({ parent = null, child }) => {

    return R.cond([
        parentIsNull,
        parentNotNull
    ])({ parent, child })
} 