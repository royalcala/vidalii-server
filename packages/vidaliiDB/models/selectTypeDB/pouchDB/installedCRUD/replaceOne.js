const R = require('ramda')

module.exports = ({ dataBase, schemaTools, schemaValidator }) => ({ newDoc, context = false }) => {
    return {
        print: () => {
            return {
                name: {
                    schema: '',
                    method: 'replaceOne'
                },
                newDoc
            }
        },
        save: async () => {
            try {
                // let resultValidation = validation({ schemaTools, schemaValidator, newDoc })
                let response = await dataBase.put(newDoc)
                response._rev = response.rev
                let final = {
                    ...newDoc,
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
