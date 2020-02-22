import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useRouteMatch } from "react-router-dom";
const capitalize = name => name.charAt(0).toUpperCase() + name.slice(1)
const ParentPath = ({ name }) => <Typography color="inherit" >{name}</Typography>
const Path = ({ name }) => <Typography color="textPrimary">{name}</Typography>
const Elements = ({ arrayPaths }) => {
    const length = arrayPaths.length
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {arrayPaths.map((name, index) => (length - 1 === index) ?
                <Path name={name} key={index} /> :
                <ParentPath {...{ name, key: index }} />
            )}
        </Breadcrumbs>
    )
}
const BreadcrumbSimple = ({ manualPath = null }) => {
    let { path } = useRouteMatch()
    if (manualPath !== null)
        return <Elements arrayPaths={manualPath} />
    else {
        let arrayPaths = path.split('/').slice(1).map(capitalize)
        return <Elements arrayPaths={arrayPaths} />
    }
}

export default BreadcrumbSimple