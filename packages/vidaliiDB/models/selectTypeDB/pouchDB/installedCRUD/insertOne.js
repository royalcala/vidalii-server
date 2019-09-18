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
    // console.log('result::',result)
    // let checkResult = validationResult(result)

    // return checkResult
    return result
}

module.exports = ({ dataBase, schemaTools, schemaValidator }) => async (newDoc) => {
    try {
        let result = validation({ schemaTools, schemaValidator, newDoc })
        let response = await dataBase.put(result)
        return {
            ...result,
            ...response
        }
    } catch (err) {
        console.log(err)
        return err
    }
}