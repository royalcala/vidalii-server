import React from "react"
import { useHistory } from "react-router-dom";
const initStateSession = () => {
    const store = {
        session: false
    }
    return {
        store,
        setSession: ({ username, password }) => {
            alert(username, password);
            if (username === 'a@a.com' && password === 'p') {
                alert('Correct')
                store.session = true
                // let history = useHistory();

            }
            else
                alert('Error')


            // setTimeout(() => {
            //     alert('Error.:', JSON.stringify(values, null, 2));
            // }, 400);

        }
    }
}

const stateSession = initStateSession()

export default stateSession

const validateSession = () => {

}
// const Session = props => {
//     console.log('Render State')
//     const [session, setSession] = React.useState(false)

//     return [session, setSession]

// }


// export default Session

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
