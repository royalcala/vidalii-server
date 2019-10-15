const R = require('ramda')
const fs = require('fs')
// const types = require('./valuesTypes')

const initialization = ({ input, types }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameModule, { schemas }]) => {
            return {
                [nameModule]: R.pipe(
                    R.toPairs,
                    R.reduce(
                        (acc, [nameSchema, valueSchema]) =>
                            R.mergeDeepLeft(
                                acc,
                                R.assocPath(
                                    R.split('.', nameSchema),
                                    valueSchema({ types }),
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

module.exports = ({ input, libraries: { schema_fxs_types } }) => {
    const init = initialization({ input, types: schema_fxs_types })
    return init
}
