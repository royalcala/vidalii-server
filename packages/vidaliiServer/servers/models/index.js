const R = require('ramda')
const mergeSchemasFiles = require('@vidalii/db/schemas/mergeSchemasFiles')(__dirname + '/schemasInstalled')
const models = require('@vidalii/db/models')()
models.loadManySchemas(mergeSchemasFiles)

// Object.entries(mergeSchemasFiles).map(
//     ([nameSchema, { schema, database }]) => {
//         models.loadSchema({
//             name: nameSchema,
//             schemaValidator: schema,
//             ...database
//         })
//     }
// )
// console.log(models.models())

module.exports = models
