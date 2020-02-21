import React from "react"
import Admin from 'ui/Admin'
import Login from 'ui/Login'
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { SESSION_GET_TOKEN } from 'gql/actions'
import gql from 'graphql-tag';
import LoadingProgressBar from "ui/Loading.ProgressBar";
// const Session = props => {
//     console.log('Render Session')
//     const client = useApolloClient()
//     const { token } = client.readQuery({
//         query: SESSION_GET_TOKEN
//     })
//     if (token === null)
//         return <Login />
//     else
//         return <Admin />
// }
const Session = props => {
    console.log('Render Session')
    const { loading, data, error } = useQuery(SESSION_GET_TOKEN);
    // console.log('error::', error)
    // console.log('%c⧭', 'color: #997326', 'Session-->:', data);

    if (loading)
        return <LoadingProgressBar />
    else if (data.token === null)
        return <Login />
    else
        return <Admin />
    // else if (data.session_get.token)
    //     return <Admin />
    // else
    //     return <div>Error:{error}</div>
    // return <div>Admin</div>
}
export default Session
