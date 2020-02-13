import React from "react";
import useImportSchemas from '../../Lib/useImportSchemas'

const Session = schema => {
    console.log('Render Session')
    const [session, setSession] = React.useState(false)
    const { loading, imports } = useImportSchemas(schema)
    if (loading)
        return <div>loading</div>
    if (session === true)
        return imports.admin.Component
    else
        return imports.login.Component

}

export default Session