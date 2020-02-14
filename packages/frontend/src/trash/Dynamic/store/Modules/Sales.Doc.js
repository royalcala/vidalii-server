import React from 'react'
import { useRouteMatch, useLocation, useHistory, useParams } from 'react-router-dom'
import BreadCrumb from '../Vidalii/BreadCrumb.Simple'
export default () => {
    let match = useRouteMatch();
    console.log('%c⧭', 'color: #aa00ff', match);
    const location = useLocation()
    const history = useHistory()
    const params = useParams()

    return <>
        <BreadCrumb
            // byCustom={['Sales', 'Document']}
            byMatch={match} />
        <button onClick={() => history.goBack()}>Go Back</button>
        <button onClick={() => history.push("/about")}>Go About</button>
    </>
}