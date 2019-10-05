const R = require('ramda')
// const fs = require('fs')

// const validators = require('./readInstalled')(__dirname + '/' + 'installedValidators')

// const initDatabase = ({ nameModule }) => schema => R.pipe(
//     s => s.typeDB({
//         url: s.url,
//         dbName: nameModule
//     })
// )(schema)


// const defaultsValues = schema => R.pipe(
//     (s) => {
//         s.validateDoc = s.validateDoc || validators.validateDoc
//         s.updateDoc = s.updateDoc || validators.updateDoc
//         return s
//     }
// )(schema)

// const initialization = ({ input }) => R.pipe(
//     R.toPairs,
//     R.map(
//         ([nameModule, { databases }]) => {
//             return {
//                 [nameModule]: R.pipe(
//                     R.toPairs,
//                     R.map(
//                         ([nameSchema, valueSchema]) => ({
//                             [nameSchema]: R.pipe(
//                                 valueSchema,
//                                 // defaultsValues,
//                                 initDatabase({ nameModule })
//                             )({ typesDB })
//                         })
//                     ),
//                     R.mergeAll
//                 )(databases)
//             }
//         }
//     ),
//     R.mergeAll
// )(input)

module.exports = ({ databases, schemas }) => {
    // const init = initialization({ input })
    console.log('databases::',databases)
    return 'im database'
}