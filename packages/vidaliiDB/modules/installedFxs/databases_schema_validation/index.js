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
const initialization = ({ input, schemas, databases }) => {
    return R.pipe(
        R.toPairs,

    )(databases)
}

module.exports = ({ input, schemas, databases }) => {
    // console.log('input::', input)
    // console.log('databases::', databases)
    // console.log('schemas::', schemas)
    // const init = initialization({
    //     input, schemas, databases
    // })
    // console.log('init::', init)
    return { ok: true }
}