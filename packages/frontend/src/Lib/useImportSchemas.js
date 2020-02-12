import React from 'react'
import loadable from '@loadable/component'


export default (schema) => {
    const [state, setState] = React.useState({ loading: true })
    React.useEffect(
        () => {
            const importSchemas = async () => {
                console.log('importing schemas')
                const schemas = {}
                const entries = Object.entries(schema.imports)
                const promises = entries.map(
                    ([key, value]) => import(`../Components/schemas/${value}`)
                )
                let data = await Promise.all(promises);

                entries.forEach(
                    ([key, value], index) => {
                        schemas[key] = data[index].default
                    }
                )
                console.log('%c⧭', 'color: #0088cc', schemas);
                setState({})
            }
            importSchemas()
        }
        , [])
    return {
        ...state
    }
}