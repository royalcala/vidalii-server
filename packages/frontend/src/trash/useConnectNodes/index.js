import React from 'react'
import nextNodes from './nextNodes'
export default (node = {}, parentProps = {}) => {
    const [state, setState] = React.useState({ loading: true })
    React.useEffect(
        () => {
            const importNodes = async () => {
                const { nodes, components } = await nextNodes(node, parentProps)
                setState({ nodes, components })
            }
            importNodes()
        }
        , [])
    return {
        ...state
    }
}