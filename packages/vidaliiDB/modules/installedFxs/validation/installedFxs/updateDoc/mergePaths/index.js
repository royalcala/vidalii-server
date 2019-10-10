const R = require('ramda')

module.exports = ({path1, path2}) => R.pipe(
    R.concat(path1),
    R.map(
        R.pipe(
            data => R.insert(0, data.length, data),
            R.join('.')
        )
    ),
    R.sort((a, b) => a > b ? -1 : 1),
    R.dropRepeats,
    R.map(R.split('.')),
    R.map(
        R.drop(1)
    )
)(path2)