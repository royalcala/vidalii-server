import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

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
export default ({ byCustom = null, byMatch = null }) => {
    if (byCustom !== null)
        return <Elements arrayPaths={byCustom} />
    else if (byMatch !== null) {
        const { path, url } = byMatch
        let arrayPaths = path.split('/').slice(1).map(capitalize)
        return <Elements arrayPaths={arrayPaths} />
    }
}