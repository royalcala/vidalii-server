const R = require('ramda')
const fs = require('fs')
const types = require('./valuesTypes')

module.exports = ({ inputData }) => R.pipe(
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
)(inputData)


// const composeSchemas = schemas => R.pipe(
//     R.dissoc('main'),
//     R.toPairs,
//     R.reduce(
//         (acc, [nameSchema, valueSchema]) =>
//             R.assocPath(
//                 R.split('.', nameSchema),
//                 valueSchema,
//                 acc
//             ),
//         { ...schemas.main })
// )(schemas)

// const appInput = pathToRead => R.pipe(
//     fs.readdirSync,
//     R.map(x => {
//         let nameFile = R.replace('.js', '', x)
//         return {
//             [nameFile]: require(pathToRead + '/' + x)({ types })
//         }
//     }),
//     R.mergeAll
// )(pathToRead)

// module.exports = ({ pathToComponent }) => {
//     const schema = R.pipe(
//         appInput,
//         composeSchemas
//     )(pathToComponent)

//     return schema
// }