import React from 'react'
import { useRouteMatch, useLocation, useHistory, useParams } from 'react-router-dom'


export default () => {
    // let match = useRouteMatch("/about/:myKey/:myKey2");
    const location = useLocation()
    const history = useHistory()
    const params = useParams()

    return <>
        <div>Purchases</div>
        <div>Location={location.pathname}</div>
        <div>From = {location.state.from}</div>
        <button onClick={() => history.goBack()}>Go Back</button>
        <button onClick={() => history.push("/home")}>Go Home</button>
    </>
}