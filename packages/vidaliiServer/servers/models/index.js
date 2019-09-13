const R = require('ramda')
const { mergeSchemasFiles, updateDoc, validatorDoc } = require('@vidalii/db/schemas')
// const mergeSchemasFiles = require('@vidalii/db/schemas/mergeSchemasFiles')

const models = require('@vidalii/db/models')({
    updateDoc,
    validatorDoc
})
models.loadManySchemas(
    mergeSchemasFiles(__dirname + '/schemasInstalled')
)

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
