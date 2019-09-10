const R = require('ramda')

module.exports = ({ schemas, sdlMutations }) => R.pipe(
    ({ schemas, sdlMutations }) => R.map(([name, fx]) => fx({ schemas, name }), sdlMutations),
    R.reduce(
        (acc, v) => R.concat(acc, v),
        'type Mutation {\n'
    ),
    R.concat(R.__, '}')
)({ schemas, sdlMutations })