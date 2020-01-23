export default ({ storeTypes }) => ({ nameType, nameField, typeField }) => {
    // console.log('storeTypes::', storeTypes)
    // console.log('nameType1::', nameType)
    if (!storeTypes[nameType])
        storeTypes[nameType] = {}
    if (storeTypes[nameType][nameField])
        console.log(`You have a duplicated sdl type field:${nameField} and was remplaced`)


    storeTypes[nameType][nameField] = {
        nameField,
        typeField
    }

}