const R = require('ramda')
const printGraphql = require('../graphql/printGraphql')
const loadSchema = require('./loadSchema')

function main() {
    var storeModels = {}
    var storeSchemas = {}
    return {
        schemas: () => storeSchemas,
        models: () => storeModels,
        printGraphql: () => printGraphql({ schemas: storeSchemas, models: storeModels }),
        loadSchema: ({ ...newModelData }) => {
            let { newModels, newSchemas } = loadSchema({
                prevModels: storeModels,
                prevSchemas: storeSchemas
            })(newModelData)

            storeModels = newModels
            storeSchemas = newSchemas
        },
        loadManySchemas: objectSchemas => {
            Object.entries(objectSchemas).map(
                ([nameSchema, { schema, database }]) => {
                    let { newModels, newSchemas } = loadSchema({
                        prevModels: storeModels,
                        prevSchemas: storeSchemas
                    })({
                        name: nameSchema,
                        schemaValidator: schema,
                        ...database
                    })

                    storeModels = newModels
                    storeSchemas = newSchemas

                }
            )
        }

    }
}

module.exports = main