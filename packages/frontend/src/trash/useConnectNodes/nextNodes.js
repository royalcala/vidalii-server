import React from 'react'
// import loadable from '@loadable/component'
const buildNextNodes = (entriesNextNodes, nodes, components, parentProps) => {
    const imports = {
        nodes: {},
        components: {}
    }
    entriesNextNodes.forEach(
        ([key], index) => {
            imports.nodes[key] = nodes[index]
            imports.components[key] = React.createElement(
                components[index],
                {
                    ...nodes[index],
                    parentProps: parentProps[key] ? parentProps[key] : {}
                }
            )
        }
    )
    return imports
}
const fetchNextComponents = async nodes => {
    const promises = nodes.map(
        // ({ component }) => loadable(() => import(`../../Components/Installed/${component}`)).load()
        ({ component }) => import(`../../components/${component}`)
    )
    let modules = await Promise.all(promises);
    return modules.map(
        module => module.default
    )
}
const fetchNextNodes = async edges => {
    const promises = edges.map(
        ([key, value]) => import(`../../nodes/${value}`)
    )
    let modules = await Promise.all(promises);
    return modules.map(
        module => module.default
    )
}

export default async (node, parentProps) => {
    const entriesNextNodes = Object.entries(node.nextNodes)
    const nodes = await fetchNextNodes(entriesNextNodes)
    const components = await fetchNextComponents(nodes)
    return buildNextNodes(entriesNextNodes, nodes, components, parentProps)
}