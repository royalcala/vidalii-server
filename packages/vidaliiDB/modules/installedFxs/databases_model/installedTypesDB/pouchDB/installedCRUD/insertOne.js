const R = require('ramda')

module.exports = (crudPlugins) => ({ newDoc, errorMsg = null }) => {
    const { db, validatorDoc, valueSchema } = crudPlugins
    return {
        print: () => {
            return {
                name: {
                    schema: '',
                    method: 'insertOne'
                },
                newDoc
            }
        },
        save: async () => {
            try {
                // let resultValidation = validation({ schemaTools, schemaValidator, newDoc })
                let resultValidation = validatorDoc({ schemaValidator: valueSchema.schema, newDoc })
                let response = await db.put(resultValidation)
                response._rev = response.rev
                let final = {
                    ...resultValidation,
                    ...response
                }
                return final
            } catch (err) {
                console.log(err)
                return err
            }
        }
    }
}
