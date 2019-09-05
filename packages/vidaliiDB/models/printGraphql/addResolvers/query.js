const R = require('ramda')
const firstUpper = require('./firstUpper')

module.exports = ({schemas }) => {
    return R.pipe(
        R.toPairs,
        R.reduce((acc, [nameSchema, value]) => R.concat(acc, `${R.toLower(nameSchema)}:${firstUpper(nameSchema)}\n`), 'type Query {\n'),
        R.concat(R.__, '}')
    )(schemas)
}