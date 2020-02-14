import React from 'react'
// import fetchComponents from './fetchComponents'
const PATH = '../Components'
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
    console.log('%c⧭', 'color: #ffa640', entries);


    const promises = entries.map(
        ([key, value]) => {
            let url = `${PATH}/schemas/${value}`
            console.log('%c⧭', 'color: #00b300', url);
            return import(`../Components/schemas/${value}`)
        }
    )
    console.log('no entro', promises)
    let data = await Promise.all(promises);
    console.log('%c⧭', 'color: #d90000', 'data::', data);
    return data.map(
        element => element.default
    )
}
const fetchComponents = async (imports) => {
    const entries = Object.entries(imports)
    const schemas = await fetchSchemas(entries)
    // const components = await fetchComponents(schemas)

    // return mergeSchemasAndComponents(schemas, components)
    return schemas
}
export default (schema) => {
    const [state, setState] = React.useState({ loading: true })
    React.useEffect(
        () => {
            const importSchemas = async () => {
                const schemas = await fetchComponents(schema.imports)

                // entries.forEach(
                //     ([key, value], index) => {
                //         schemas[key] = data[index].default
                //     }
                // )
                console.log('%c⧭', 'color: #0088cc', 'schemas:', schemas);
                setState({ schemas })
            }
            importSchemas()
        }
        , [])
    return {
        ...state
    }
}