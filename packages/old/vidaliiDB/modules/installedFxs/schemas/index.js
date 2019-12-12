const R = require('ramda')
const fs = require('fs')
// const types = require('./valuesTypes')

const initialization = ({ input, schemaTypes }) => R.pipe(
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
                                    fxLibrariesForSchema({ schemaTypes }),
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

module.exports = ({ input, schemaTypes }) => {
    const init = initialization({ input, schemaTypes })
    return init
}
