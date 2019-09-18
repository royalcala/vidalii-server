const R = require('ramda')

module.exports = ({ dataBase, schemaTools, schemaValidator }) => async ({ idName = '_id', newDoc }) => {
    try {
        //first check  if it is the correct revision
        let prevDoc = await dataBase.get(newDoc._id)
        if (prevDoc._rev !== newDoc._rev) {
            throw new Error({
                error: 'conflict',
                reason: `The revision of document its not the same
             in the latest document in Database` })
        }
        let resulValNewDoc = await schemaTools.validatorDoc({ schemaValidator, prevDoc, newDoc })
        let resultUpdateDoc = await schemaTools.updateDoc({ idName, prevDoc, newDoc: resulValNewDoc })
        let response = await dataBase.put(resultUpdateDoc)
        let result = {
            ...resultUpdateDoc,
            ...response
        }
        console.log('result::', result)
        return result
    } catch (err) {
        console.log(err)
        return err
    }

}