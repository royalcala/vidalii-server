import React from "react";

const Admin = node => {
    console.log('Render Admin')
    const { setSession } = node.parentProps
    const [state, setState] = React.useState(0)
    return <>
        <button onClick={() => {
            setSession(false)
        }}>setSession(false)/LogOut</button>
        <hr />
        <button onClick={() => {
            setState(state + 1)
        }}>ReRender</button>
        <div>Admin Portal yeah!{state}</div>
    </>
}

export default Admin