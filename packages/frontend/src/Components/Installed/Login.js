import React from "react";

const Login = schema => {
    console.log('Render Login')
    const [state, setState] = React.useState(0)
    return <>
        <button onClick={() => { setState(state + 1) }}>CLick</button>
        <div>Login Portal yeah!{state}</div>
    </>
}

export default Login