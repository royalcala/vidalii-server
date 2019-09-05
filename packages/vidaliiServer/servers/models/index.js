const R = require('ramda')
const mergeSchemasFiles = require('@vidalii/db/mergeSchemasFiles')(__dirname + '/schemasInstalled')
const models = require('@vidalii/db/models')({})


Object.entries(mergeSchemasFiles).map(
    ([nameSchema, { schema, database }]) => {
        models.loadSchema({
            name: nameSchema,
            schemaValidator: schema,
            ...database
        })
    }
)

// myschemas.loadSchema({
//     name: 'schema2',
//     schemaValidator: {
//         a: () => 1
//     }
// })

// console.log('mergeSchemasFiles::',
//     mergeSchemasFiles
// )

// console.log('Models::',
//     models.models()
// )

module.exports = models
