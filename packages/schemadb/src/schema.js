export default (defSchema, {
    preValidate = doc => doc,
    afterValidate = doc => doc,
    preSave = doc => doc,
    afterSave = doc => doc
} = {}) => {

    return defSchema
}