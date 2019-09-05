const R = require('ramda')

module.exports = R.pipe(
    R.trim,
    R.splitAt(1),
    ([first, rest]) => R.concat(R.toUpper(first), R.toLower(rest))

)