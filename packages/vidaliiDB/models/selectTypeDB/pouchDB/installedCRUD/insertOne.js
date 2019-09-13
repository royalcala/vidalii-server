module.exports = ({ dataBase, schemaTools, schemaValidator }) => async (newDoc) => {
    var validated = schemaTools.validatorDoc({ schemaValidator, newDoc })
    // console.log('validated::', validated)
    try {
        var response = await dataBase.put(validated);
        // console.log('responseInsertOne::', response)
        return [{
            ...validated,
            ...response
        }]
    } catch (err) {
        console.log(err)
        return err
    }
}