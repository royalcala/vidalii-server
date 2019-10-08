const R = require('ramda')
const uuidv4 = require('uuid/v4')
module.exports = ({ db }) => async ({ newDoc }) => {
    try {
        // let resultValidation = validation({ schemaTools, schemaValidator, newDoc })
        // let resultValidation = validatorDoc({ schemaValidator: valueSchema.schema, newDoc })
        // let response = await db.put(newDoc)
        let response = await R.cond([
            [R.has('_id'), db.put],
            [R.T, () => db.put(
                {
                    _id: uuidv4(),
                    ...newDoc
                }
            )]
        ])(newDoc)
        response._id = response.id
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

// module.exports = (crudPlugins) => ({ newDoc, errorMsg = null }) => {
//     const { db, validatorDoc, valueSchema } = crudPlugins
//     return {
//         print: () => {
//             return {
//                 name: {
//                     schema: '',
//                     method: 'insertOne'
//                 },
//                 newDoc
//             }
//         },
//         save: async () => {
//             try {
//                 // let resultValidation = validation({ schemaTools, schemaValidator, newDoc })
//                 let resultValidation = validatorDoc({ schemaValidator: valueSchema.schema, newDoc })
//                 let response = await db.put(resultValidation)
//                 response._rev = response.rev
//                 let final = {
//                     ...resultValidation,
//                     ...response
//                 }
//                 return final
//             } catch (err) {
//                 console.log(err)
//                 return err
//             }
//         }
//     }
// }
