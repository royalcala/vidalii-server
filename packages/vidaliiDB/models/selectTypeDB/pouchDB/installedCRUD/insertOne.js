const R = require('ramda')

const ifResultNull = [
    (result) => {
        // R.isNil(result) || R.isEmpty(result)
        console.log('nil:', R.isNil(result))
        console.log('empty:', R.isEmpty(result))
        return true
    },
    (result) => { throw new Error(`Result:${result}.The result of the validation cant be null,undefined or empty.`) }
]
const validationResult = result => R.cond([
    ifResultNull,
    [R.T, (result) => result]
])(result)

const validation = ({ schemaTools, schemaValidator, newDoc }) => {
    let result = schemaTools.validatorDoc({ schemaValidator, newDoc })
    return result
}

module.exports = ({ dataBase, schemaTools, schemaValidator }) => ({ newDoc, context = false }) => {
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
                let resultValidation = validation({ schemaTools, schemaValidator, newDoc })
                let response = await dataBase.put(resultValidation)
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