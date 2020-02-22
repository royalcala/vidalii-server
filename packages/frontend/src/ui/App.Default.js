import React from 'react'
import Breadcrumb from "ui/BreadCrumb.Simple";
import { useLocation } from 'react-router-dom'
const Default = () => {
    const { pathname } = useLocation()

    return (
        <>
            <Breadcrumb manualPath={['app', 'default']} />
            <div>on App.Default, the url doesn exits:{pathname}</div>
        </>
    )
}
export default Default