import React from 'react'
import { html } from 'htm/react';
import htm from 'htm';
import loadable from '@loadable/component'
// import Button from '@material-ui/core/Button';
const loadComponent = () => {
    const store = {
        Button: loadable(() => import('@material-ui/core/Button'))
    }

    // return store[name]
    return {
        get: name => {
            return store[name].load()
        }
    }
}
const Button = loadable(() => import('@material-ui/core/Button'))
// const Button = props => {
//     
//     const [state, setState] = React.useState(0)

//     // return html`<button>hola</button>`
//     return <button onClick={() => setState(state + 1)}>{state}</button>
// }

// const QueryState = () => {
//     const [state, setState] = React.useState({ data: 'Hellow World!' })

//     return { state }
// }
// const Children = [Button]
// const Directives = [QueryState]





const Form1 = props => {
    return <>
        <div>Im Form1</div>
        <div>{props.children}</div>
    </>
}

// const Array = Children.map(
//     //import dynamic by name Component
//     Element => <Element key={1} />
// )
// return Array
// const loadingComponentsParallel = loadable(async () => {
//     const [{ default: Books }, { default: books }] = await Promise.all([
//         import('./Books'),
//         import('./books.json'),
//     ])

//     return props => <Books {...props} books={books} />
// })

const getStrComponets = async ({ schema, str = '' }) => {
    let id
    for (id in schema) {
        const { component: nameComponent, directives = [] } = schema[id]
        const Component = await loadComponent().get(nameComponent)
        str = `<${Component.default}><//>`
        // str = Component.default
    }

    return str
}
const Comp = () => <div>Hi1</div>



function h(type, props, ...children) {
    console.log('h:::',type, props, children)
    return React.createElement(type, props, children)
}

const html2 = htm.bind(h);

// console.log(html2`<h1 id=hello><div/></h1>`);

const Dynamic = props => {
    console.log('Render Dynamic')

    const { schema } = props
    const [state, setState] = React.useState({ loading: true })
    React.useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        // document.title = `You clicked times`;
        async function getComponets() {
            const str = await getStrComponets({ schema })
            // console.log('%c⧭', 'color: #f279ca', str);
            setState({ components: str })
        }
        getComponets()

    }, []);

    console.log('component::', state.components)
    if (state.loading)
        return <Form1>
            <div>Im Child1..loading</div>
            <div>Im Child2...loading</div>
        </Form1>
    else
        // return html`<${state.components}>ha<//>`
        // return html(state.components)
        return html2`<${Button}>with html2<//>`
    // return html`<button>hellow</button>`
}


export default Dynamic
// export default Button
