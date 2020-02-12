import React from 'react'
import fetchComponents from './fetchComponents'

// const mergeSchemasAndComponents = (schemas, components) => {

// }
// // const fetchComponents = async schemas => {
// //     console.log('%c⧭', 'color: #917399', schemas);
// //     const promises = schemas.map(
// //         ({ type }) => import(`${PATH}/Installed/${type}`)
// //     )
// //     let data = await Promise.all(promises);
// //     return data
// // }
// const fetchSchemas = async entries => {
//     const promises = entries.map(
//         ([key, value]) => {            
//             return import(`../../Components/schemas/${value}`)
//         }
//     )    
//     let data = await Promise.all(promises);    
//     return data.map(
//         element => element.default
//     )
// }
// const fetchComponents = async (imports) => {
//     const entries = Object.entries(imports)
//     const schemas = await fetchSchemas(entries)
//     // const components = await fetchComponents(schemas)

//     // return mergeSchemasAndComponents(schemas, components)
//     return schemas
// }
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