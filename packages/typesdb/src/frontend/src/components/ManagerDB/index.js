import React from 'react'
import { html } from 'htm/react';

// function Type(Children1, Children2) {
//     console.log('render ManagerDB')

//     const [state, setState] = React.useState(0);
//     return [
//         <div key="0">Im Type</div>,
//         // <div>Im Type</div>
//         Children1,
//         <Children2 state={state} />
//     ]

// }
// const Children1 = <div key="1">Im Children1</div>
// const Children2 = () => {
//     console.log('render children2')
//     const [state, setState] = React.useState(0);

//     return <button onClick={() => setState(state + 1)}>{state}</button>
// }
// function DirectiveType() {
//     console.log('render ManagerDB->DirectiveType')
//     const [state, setState] = React.useState(0);
//     return (
//         <div>
//             In ManagerDB{state}
//             <button onClick={() => setState(state + 1)}>Onclick</button>
//             hola
//         </div>
//     )
// }

// const Button = ({ state, setState }) => React.createElement('button', {
//     onClick: () => setState(state + 1)
// }, state)
// function DirectiveState() {
//     const [state, setState] = React.useState(0);
//     return { state, setState }
// }

// function Pinta(props) {
//     const { state, setState } = DirectiveState()
//     return Button
// }
// const Pinta = E1 => props => {
//     console.log('rendePinta')
//     const { state, setState } = E1()
//     return Button({ state, setState })
// }

// export default (props) => Type(Children1, Children2)
// export default Pinta(DirectiveState)
const Button = props => {
    console.log('render Button')
    const [state, setState] = React.useState(0)

    // return html`<button>hola</button>`
    return <button onClick={() => setState(state + 1)}>{state}</button>
}

const QueryState = () => {
    const [state, setState] = React.useState({ data: 'Hellow World!' })

    return { state }
}
const Children = [Button]
const Directives = [QueryState]

const Dynamic = (Directives, Children) => props => {
    console.log('render Dynamic')
    // return html`<${Children[0]}/>`
    const Array = Children.map(
        //import dynamic by name Component
        Element => <Element key={1} />
    )
    return Array
}

export default Dynamic(Directives, Children)
// export default Button
