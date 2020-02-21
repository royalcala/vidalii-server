import React from 'react'
import CloseSession from 'ui/Admin.CloseSession'
const Admin = props => {
    console.log('Render Admin***')

    return (
        <>
            <CloseSession/>
            <div>Admin</div>
        </>
    )
}
Admin.displayName = "Changing the name of Admin.js"
export default Admin