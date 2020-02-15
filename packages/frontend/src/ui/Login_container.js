import React from "react";
import Box from "./Box";
const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
}
const styleHeader = {
    height: '10%',
}

const Login = props => {
    console.log('Render Login Container')
    return (
        <Box {...style}>
            {props.children}
        </Box>
    )
}

export default Login