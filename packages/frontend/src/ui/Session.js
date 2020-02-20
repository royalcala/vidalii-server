import React from "react"
import Admin from 'ui/Admin'
import Login from 'ui/Login'
import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/client';
import { SESSION_GET } from 'gql/actions'
import gql from 'graphql-tag';

const Session = props => {
    console.log('Render Session')
    const { loading, data, error } = useQuery(SESSION_GET, {
        fetchPolicy: 'cache-only',
        // variables: {
        //     username: null,
        //     password: null
        // }
        // onError: (...data) => {
        //     console.log('%c⧭', 'color: #f2ceb6', 'onEroorrrr', data);
        //     return {
        //         hellow: 'World'
        //     }
        // }
    });
    // console.log('error::', error)
    console.log('%c⧭', 'color: #997326', 'Session-->:', data);
    // const [{ loading, data }, setState] = React.useState({ loading: true })

    // React.useEffect(() => {
    //     async function Hola() {
    //         const data = await client.query({
    //             query: SESSION_GET
    //         })
    //         console.log('data', data)
    //         setState(data)
    //     }
    //     Hola()
    // }, []);
    if (loading || !data)
        return <Login />
    else if (data.session_get.token)
        return <Admin />
    else
        return <div>Error:{error}</div>
    // return <div>Admin</div>
}
export default Session
