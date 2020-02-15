import React from 'react'
import Box from "./Box";
import TextField from '@material-ui/core/TextField';
const container = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    border: 1,
    borderColor: "grey.300",
    borderRadius: 8,
    width: "33%",
    p: "5%"
    // xs: {
    // m: "auto",
    // pt: "10%"
    // mt: 4,
    // ml: "30%",
    // mr: "33%"
    // }
}
const Login_byUsername = props => {

    return <Box {...container}>
        <div>logo</div>
        <div>Acceder</div>
        <div>Usa tu cuenta</div>
        <TextField
            autoFocus
            fullWidth
            label="Correo Electrónico"
            variant="outlined"
        />
    </Box>
}

export default Login_byUsername