const R = require('ramda')



module.exports = (crudPlugins) => ({ newDoc }) => {
    const { db, validatorDoc, updateDoc, valueSchema: { schema } } = crudPlugins
    return {

        save: async () => {
            try {
                //first check  if it is the correct revision
                let prevDoc = await db.get(newDoc._id)
                if (prevDoc._rev !== newDoc._rev) {
                    throw new Error(`The revision:_rev of the document its not the same
             as the latest document in Database`)
                }
                let resultValidation = await validatorDoc({ schemaValidator: schema, prevDoc, newDoc })
                let resultUpdateDoc = await updateDoc({ idName: '_id', prevDoc, newDoc: resultValidation })
                // console.log('resultUpdateDoc::', resultUpdateDoc)
                let response = await db.put(resultUpdateDoc.result)

                let result = resultUpdateDoc.result
                result._rev = response.rev
                console.log('result::', result)
                return result
            } catch (err) {
                console.log(err)
                return err
            }
        }
    }
}