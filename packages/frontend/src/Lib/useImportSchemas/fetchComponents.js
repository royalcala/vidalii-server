import loadable from '@loadable/component'

const mergeSchemasAndComponents = (schemas, components) => {

}
// const fetchComponents = async schemas => {
//     console.log('%c⧭', 'color: #917399', schemas);
//     const promises = schemas.map(
//         ({ type }) => import(`${PATH}/Installed/${type}`)
//     )
//     let data = await Promise.all(promises);
//     return data
// }
const fetchSchemas = async entries => {
    const promises = entries.map(
        ([key, value]) => {
            return import(`../../Components/schemas/${value}`)
        }
    )
    let data = await Promise.all(promises);
    return data.map(
        element => element.default
    )
}
const mergeData = async (imports) => {
    const entries = Object.entries(imports)
    const schemas = await fetchSchemas(entries)
    // const components = await fetchComponents(schemas)

    // return mergeSchemasAndComponents(schemas, components)
    return schemas
}
export default mergeData