import React from "react"
import stateSession from 'states/session'
import Admin from 'ui/Admin'
import Login from 'ui/Login'
import { useQuery } from '@apollo/react-hooks';
import { IS_LOGGED_IN } from 'gql/queries'
import gql from 'graphql-tag'


const Session = props => {
    console.log('Render State')
    const { loading, data } = useQuery(IS_LOGGED_IN);
    console.log('%c⧭', 'color: #e57373', data);

    if (loading)
        return <div>loading...</div>
    return data.isLoggedIn ? <Admin /> : <Login />;    
}
export default Session
