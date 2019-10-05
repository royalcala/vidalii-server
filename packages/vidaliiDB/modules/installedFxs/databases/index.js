const R = require('ramda')
// const fs = require('fs')
const typesDB = require('./readInstalled')(__dirname + '/' + 'installedTypesDB')
// const validators = require('./readInstalled')(__dirname + '/' + 'installedValidators')

// const defaultsValues = databases => R.pipe(
//     R.map(schema => {
//         schema.validateDoc = schema.validateDoc || validators.validateDoc
//         schema.updateDoc = schema.updateDoc || validators.updateDoc
//         schema.typeDB({
//             updateDoc: schema.updateDoc,
//             validateDoc: schema.validateDoc,
//         })
//         return schema
//     })
// )(databases)

// module.exports = ({ pathToComponent }) => {
//     // let databases = require(pathToComponent + '/' + 'index.js')({ typesDB, validators })
//     // const withDefaults = defaultsValues(databases)
//     let appInput = require(pathToComponent + '/' + 'index.js')

//     return R.pipe(
//         appInput,
//         defaultsValues
//     )({ typesDB, validators })
// }

// module.exports = ({ schemas, databases_merge = null }) => {

//     return 'Im databases_merge'
// }
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

const initialization = ({ input }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameModule, { shards }]) => {
            return {
                [nameModule]: R.pipe(
                    R.toPairs,
                    R.map(
                        ([nameSchema, valueSchema]) => ({
                            [nameSchema]: valueSchema({
                                typesDB
                            })
                        })
                    ),
                    R.mergeAll
                )(shards)
            }
        }
    ),
    R.mergeAll
)(input)

module.exports = ({ input }) => {
    const init = initialization({ input })
    console.log('databases::', init)
    return init
}