import React from 'react'
import Breadcrumb from "ui/BreadCrumb.Simple";

const Default = () => {
    return (
        <>
            <Breadcrumb manualPath={['app','default']} />
            <div>on App.Default</div>
        </>
    )
}
export default Default