import React from "react";
import loadable from '@loadable/component'
import useImportSchemas from '../../Lib/useImportSchemas'
// import { useImportSchemas } from '@vidalii/query-components'

const Component = schema => {
    console.log('%c⧭', 'color: #e50000', schema);
    const { loading, schemas } = useImportSchemas(schema)
    console.log('%c⧭', 'color: #733d00', 'loading:', loading);
    // const schemas = {
    //     admin: loadable(() => import(`./${schema.imports.admin}/`)),
    //     // login: loadable(() => import(`./${schema.imports.login}`))
    // }
    // console.log('schemas:', schemas)
    // const Admin = loadable(() => import(`./${schema.imports.Admin}`))
    // const Login = loadable(() => import(`./${schema.imports.Login}`))
    if (loading)
        return <div>loading</div>
    else
        return <div>{JSON.stringify(schemas)}</div>
    // if (true)
    //     return <Admin />
    // else
    //     return <Login />

}

export default Component