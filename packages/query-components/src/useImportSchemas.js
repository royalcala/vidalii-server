import React from 'react'
import loadable from '@loadable/component'


export default (schema) => {
    const [state, setState] = React.useState({ loading: true })
    React.useEffect(
        () => {
            const importSchemas = async () => {
                console.log('importing schemas')
                await loadable(() => import(`../src/Components/schemas/admin`))
                setState({})
            }
            importSchemas()
        }
        , [])
    return {
        ...state
    }
}