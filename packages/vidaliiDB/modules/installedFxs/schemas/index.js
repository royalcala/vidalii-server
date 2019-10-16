const R = require('ramda')
const fs = require('fs')
// const types = require('./valuesTypes')

const initialization = ({ input, schema_types }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameModule, { schemas }]) => {
            return {
                [nameModule]: R.pipe(
                    R.toPairs,
                    R.reduce(
                        (acc, [nameSchema, fxLibrariesForSchema]) =>
                            R.mergeDeepLeft(
                                acc,
                                R.assocPath(
                                    R.split('.', nameSchema),
                                    fxLibrariesForSchema({ schema_types }),
                                    {}
                                )
                            )
                        ,
                        {}
                    )
                )(schemas)
            }
        }
    ),
    R.mergeAll
)(input)

module.exports = ({ input, libraries: { schema_types } }) => {
    const init = initialization({ input, schema_types })
    return init
}
