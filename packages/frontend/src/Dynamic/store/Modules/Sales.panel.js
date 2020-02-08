import React from 'react'
import { useRouteMatch, useLocation, useHistory, useParams } from 'react-router-dom'

export default () => {
    let match = useRouteMatch("/about/:myKey/:myKey2");
    const location = useLocation()
    const history = useHistory()
    const params = useParams()

    return <>
        <div>Sales->Panel</div>
        <button onClick={() => history.goBack()}>Go Back</button>
        <button onClick={() => history.push("/about")}>Go About</button>
    </>
}