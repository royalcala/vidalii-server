import React from 'react'
// import loadable from '@loadable/component'
const buildNextNodes = (edges, nodes, components, parentProps) => {
    const imports = {
        nodes: {},
        components: {}
    }
    edges.forEach(
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
const nextComponents = async nodes => {
    const promises = nodes.map(
        // ({ component }) => loadable(() => import(`../../Components/Installed/${component}`)).load()
        ({ component }) => import(`../../components/${component}`)
    )
    let modules = await Promise.all(promises);
    return modules.map(
        module => module.default
    )
}
const nextNodes = async edges => {
    const promises = edges.map(
        ([key, value]) => import(`../../nodes/${value}`)
    )
    let modules = await Promise.all(promises);
    return modules.map(
        module => module.default
    )
}

export default async (node, parentProps) => {
    const edges = Object.entries(node.edges)
    const nodes = await nextNodes(edges)
    const components = await nextComponents(nodes)
    return buildNextNodes(edges, nodes, components, parentProps)
}