import React from 'react'
import loadable from '@loadable/component'
//with this webpack function you import with all the bundle staticly
// require.context(
//     './store',
//     false,
//     /\.stories\.js$/
//     )
export const createComponents = async ({ schema }) => {
    console.log('Render createComponts')
    let components = []
    let key
    for (key in schema) {
        const { component: nameComponent, props = {}, children, directives = [] } = schema[key]
        console.log('%c%s', 'color: #c9cc99', props);
        //works too
        // const module = await import(`./store/${nameComponent}`)
        const module = await loadable(() => import(`./store/${nameComponent}`)).load()

        if (children.text)
            components.push(
                React.createElement(module.default, { key, ...props }, children.text)
            )
        else if (children)
            console.log('recursive composing children components')
    }

    return components
}

