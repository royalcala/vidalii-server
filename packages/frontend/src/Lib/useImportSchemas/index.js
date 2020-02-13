import React from 'react'
import fetchComponents from './fetchComponents'
export default (schema) => {
    const [state, setState] = React.useState({ loading: true })
    React.useEffect(
        () => {
            const importSchemas = async () => {
                const imports = await fetchComponents(schema.imports)
                setState({ imports })
            }
            importSchemas()
        }
        , [])
    return {
        ...state
    }
}