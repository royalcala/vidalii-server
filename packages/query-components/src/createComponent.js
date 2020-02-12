import React from 'react'
import loadable from '@loadable/component'
//with this webpack function you import with all the bundle staticly
// require.context(
//     './store',
//     false,
//     /\.stories\.js$/
//     )
export const createComponents = async (schema) => {
    console.log('Render createComponts')
    let components = []
    let key
    for (key in schema) {
        const { type, props = {}, children, directives = [] } = schema[key]
        //works too
        // const module = await import(`./store/${nameType}`)
        const module = await loadable(() => import(`./store/${type}`)).load()

        if (children.text)
            components.push(
                React.createElement(module.default, { key, ...props }, children.text)
            )
        else if (children) {
            const ChildrenComponents = await createComponents(schema[key].children)
            components.push(
                React.createElement(module.default,
                    { key, ...props },
                    ChildrenComponents
                )
            )
        }

    }

    return components
}

