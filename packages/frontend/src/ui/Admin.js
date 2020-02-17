import React from 'react'

const Admin = props => {
    console.log('Render Admin***')
    console.log('%c⧭', 'color: #408059', props);

    return <div>Admin</div>
}
Admin.displayName = "Changing the name of Admin.js"
export default Admin