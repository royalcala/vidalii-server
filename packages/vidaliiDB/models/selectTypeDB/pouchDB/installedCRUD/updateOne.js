const R = require('ramda')

module.exports = ({ dataBase, schemaTools, schemaValidator }) => async ({ newDoc }) => {
    // console.log('newDoc::::',newDoc)
    try {
        //first check  if it is the correct revision
        let prevDoc = await dataBase.get(newDoc._id)
        if (prevDoc._rev !== newDoc._rev) {
            throw new Error(`The revision:_rev of the document its not the same
             as the latest document in Database`)
        }
        let resultValidation = await schemaTools.validatorDoc({ schemaValidator, prevDoc, newDoc })
        let resultUpdateDoc = await schemaTools.updateDoc({ idName: '_id', prevDoc, newDoc: resultValidation })
        // console.log('resultUpdateDoc::', resultUpdateDoc)
        let response = await dataBase.put(resultUpdateDoc.result)

        let result = resultUpdateDoc.result
        result._rev = response.rev
        console.log('result::', result)
        return result
    } catch (err) {
        console.log(err)
        return err
    }

}