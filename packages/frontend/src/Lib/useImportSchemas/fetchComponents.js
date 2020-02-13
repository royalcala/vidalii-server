import React from 'react'
// import loadable from '@loadable/component'
const mergeSchemasAndComponents = (entries, schemas, components) => {
    const imports = {}
    entries.forEach(
        ([key], index) => {
            imports[key] = {
                schema: schemas[index],
                Component: React.createElement(components[index], { ...schemas[index] }
                )
            }
        }
    )
    return imports
}
const fetchComponents = async schemas => {
    const promises = schemas.map(
        // ({ type }) => loadable(() => import(`../../Components/Installed/${type}`)).load()
        ({ type }) => import(`../../Components/Installed/${type}`)
    )
    let modules = await Promise.all(promises);
    return modules.map(
        module => module.default
    )
}
const fetchSchemas = async entries => {
    const promises = entries.map(
        ([key, value]) => import(`../../Components/schemas/${value}`)
    )
    let modules = await Promise.all(promises);
    return modules.map(
        module => module.default
    )
}

export default async (imports) => {
    const entries = Object.entries(imports)
    const schemas = await fetchSchemas(entries)
    const components = await fetchComponents(schemas)
    return mergeSchemasAndComponents(entries, schemas, components)
}