const R = require('ramda')
const firstUpper = require('../../firstUpper')

//name=insertOne
module.exports = ({ schemas, name }) => {
    return R.pipe(
        R.toPairs,
        R.reduce(
            (acc, [nameSchema, value]) =>
                R.concat(
                    acc,
                    // `${R.toLower(nameSchema)}_insertOne(data:JSON):[${firstUpper(nameSchema)}]\n`
                    `${R.toLower(nameSchema)}_${name}(data: JSON): [${firstUpper(nameSchema)}]\n`
                ),
            // 'type Mutation {\n'
            ''
        ),
        // R.concat(R.__, '}')
    )(schemas)
}