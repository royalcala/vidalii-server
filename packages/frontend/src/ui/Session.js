import React from "react"
import stateSession from 'localState/session'
import Admin from 'ui/Admin'
import Login from 'ui/Login'
import { useQuery } from '@apollo/react-hooks';
import { SESSION_GET } from 'gql/actions'


const Session = props => {
    console.log('Render State')
    const { loading, data } = useQuery(SESSION_GET);
    console.log('%c⧭', 'color: #997326', data);

    if (loading)
        return <div>loading...</div>
    else return data.session_get.token ? <Admin /> : <Login />;
    //else  return <div>hn</div>
}
export default Session
