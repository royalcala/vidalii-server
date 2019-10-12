// const R = require('ramda')

module.exports = ({ db }) => async ({ _id, newDoc }) => {
    try {
        // let resultValidation = validation({ schemaTools, schemaValidator, newDoc })
        // let resultValidation = validatorDoc({ schemaValidator: valueSchema.schema, newDoc })
        let response = await db.put({
            _id,
            ...newDoc
        })
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
//                     method: 'replaceOne'
//                 },
//                 newDoc
//             }
//         },
//         save: async () => {
//             try {
//                 // let resultValidation = validation({ schemaTools, schemaValidator, newDoc })
//                 // let resultValidation = validatorDoc({ schemaValidator: valueSchema.schema, newDoc })
//                 let response = await db.put(newDoc)
//                 response._rev = response.rev
//                 let final = {
//                     ...newDoc,
//                     ...response
//                 }
//                 return final
//             } catch (err) {
//                 console.log(errorMsg, err)
//                 return err
//             }
//         }
//     }
// }
