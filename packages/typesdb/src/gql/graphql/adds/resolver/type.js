export default ({ storeTypes }) => ({ nameType, nameField, fx }) => {

    if (!storeTypes[nameType])
        storeTypes[nameType] = {}
    if (storeTypes[nameType][nameField])
        console.log(`You have a duplicated resolver type field:${nameField} and was remplaced`)


    storeTypes[nameType][nameField] = {
        nameField,
        typeField
    }

}