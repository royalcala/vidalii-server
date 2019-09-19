const R = require('ramda')
// const printGraphql = require('../graphql/printGraphql')
const buildModel = require('./buildModel')

function main({ validatorDoc, updateDoc }) {
    var storeModels = {}
    var storeSchemas = {}
    var schemaTools = {
        validatorDoc,
        updateDoc
    }
    return {
        schemas: () => storeSchemas,
        models: () => storeModels,
        // printGraphql: () => printGraphql({ schemas: storeSchemas, models: storeModels }),
        loadSchema: ({ ...newModelData }) => {
            let { newModels, newSchemas } = buildModel({
                prevModels: storeModels,
                prevSchemas: storeSchemas,
                schemaTools
            })(newModelData)

            storeModels = newModels
            storeSchemas = newSchemas
        },
        loadManySchemas: objectSchemas => {
            Object.entries(objectSchemas).map(
                ([nameSchema, { schema, database }]) => {
                    let { newModels, newSchemas } = buildModel({
                        prevModels: storeModels,
                        prevSchemas: storeSchemas,
                        schemaTools
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