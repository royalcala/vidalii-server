import React from 'react'
import loadable from '@loadable/component'
var path = require('path');
const schemaComponent = (schema) => {
    // console.log('Render createComponts')
    // let components = []
    // let key
    // for (key in schema) {
    // const { type, props = {}, children, directives = [] } = schema
    //     //works too
    //     // const module = await import(`./store/${nameType}`)
    // const Compo = loadable(() => import(`Hola`))
    let data = path.resolve(__dirname, '/')
    console.log('%c%s', 'color: #f2ceb6', data);

    // const imported = await import('./Components/Installed/Session')
    // console.log('imported::', imported)

    //     if (children.text)
    //         components.push(
    //             React.createElement(module.default, { key, ...props }, children.text)
    //         )
    //     else if (children) {
    //         const ChildrenComponents = await createComponents(schema[key].children)
    //         components.push(
    //             React.createElement(module.default,
    //                 { key, ...props },
    //                 ChildrenComponents
    //             )
    //         )
    //     }

    // }

    // return components

    return React.createElement('div', {}, JSON.stringify(schema))
}

export default schemaComponent
