import React from "react"
import Admin from 'ui/Admin'
import Login from 'ui/Login'
import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/client';
import { SESSION_GET } from 'gql/actions'
import { client } from 'IndexContext'

const Session = props => {
    console.log('Render Session')
    // const { loading, data } = useQuery(SESSION_GET);
    // console.log('%c⧭', 'color: #997326', 'Session->useQuery', data);
    const [{ loading, data }, setState] = React.useState({ loading: true })

    React.useEffect(() => {
        async function Hola() {
            const data = await client.query({
                query: SESSION_GET
            })
            console.log('data', data)
            setState(data)
        }
        Hola()
    }, []);
    if (loading)
        return <div>loading...</div>
    else
        return data.session_get.token ? <Admin /> : <Login />;
    // return <div>Admin</div>
}
export default Session
