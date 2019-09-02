const mergeSchemasFiles = require('../../toPackage/mergeSchemasFiles')

console.log('mergeSchemasFiles::',
    mergeSchemasFiles(__dirname + '/schemasInstalled')
)

module.exports = mergeSchemasFiles(__dirname + '/schemasInstalled')
// const fs = require('fs')
// const R = require('ramda')

// const mergeSchemas = R.reduce(R.mergeDeepLeft, {})

// const fileNameToArrayPath = nameFile => R.pipe(
//     R.replace('.js', ''),
//     R.split('.'),
// )(nameFile)

// const getSchemasFromObjects = R.map(
//     ([nameFile, { schema, database = null }]) => {
//         let pathObject = fileNameToArrayPath(nameFile)
//         return {
//             [R.head(pathObject)]: {
//                 schema: R.assocPath(
//                     R.drop(1, pathObject),
//                     schema,
//                     {}
//                 ),
//                 database: database === null ? {} : database
//             }
//         }
//     }

// )
// const getMapObjectsFromFiles = pathToRead => R.map(fileName => [fileName, require(pathToRead + '/' + fileName)])

// const readInstalled = (pathToRead) => R.pipe(
//     fs.readdirSync,
//     getMapObjectsFromFiles(pathToRead),
//     getSchemasFromObjects,
//     mergeSchemas
// )(pathToRead)

// console.log(readInstalled(__dirname + '/schemasInstalled'))

// module.exports = ''