import React from "react"
import stateSession from 'states/session'
import Admin from 'ui/Admin'
import Login from 'ui/Login'
const Session = node => {
    console.log('Render State')
    const { session } = stateSession.store

    if (session === true)
        return <Admin />
    else
        return <Login />
}

export default Session

// import * as R from 'ramda'
// const State = ({ node }) => {
//     console.log('Render State')
//     const state = React.useState(false)
//     return {
//         node,
//         state
//     }
// }
// const Connections = ({ node, state }) => {
//     console.log('render Connections')
//     const connenctions = useConnectNodes(
//         node,
//         {
//             // admin: { setSession },
//             // login: { setSession }
//         }
//     )
//     return {
//         node,
//         state,
//         connenctions
//     }
// }


// const Session = node => {
//     console.log('Render Session')
//     const state = State({ node })
//     const { loading, components } = Connections({ node, state })
//     if (loading)
//         return <div>loading</div>
//     if (state.session === true)
//         return components.admin
//     else
//         return components.login

// }
