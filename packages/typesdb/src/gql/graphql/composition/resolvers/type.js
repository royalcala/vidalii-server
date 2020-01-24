export default ({ storeTypes }) => ({ nameType, nameField, resolver }) => {
    console.log('nameType::', nameType)
    console.log('nameField::', nameField)
    if (!storeTypes[nameType])
        storeTypes[nameType] = {}
    if (storeTypes[nameType][nameField])
        console.log(`You have a duplicated resolver type field:${nameField} and was remplaced`)
    storeTypes[nameType][nameField] = resolver
}