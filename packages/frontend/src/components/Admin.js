import React from "react";

const Admin = schema => {
    console.log('Render Admin')
    const [state, setState] = React.useState(0)
    return <>
        <button onClick={() => { setState(state + 1) }}>CLick</button>
        <div>Admin Portal yeah!{state}</div>
    </>
}

export default Admin