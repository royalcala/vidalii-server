import React from 'react'
import { useField } from 'formik';
import Typography from '@material-ui/core/Typography';
import Box from "./Box";
import TextField from '@material-ui/core/TextField';
// import MyForm from "components/Login/ByUsername.form";
import { ReactComponent as Logo } from 'svg/google.svg';
const container = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-around',
    alignItems: 'center',
    border: 1,
    borderColor: "grey.300",
    borderRadius: 8,
    width: "25%",
    p: "3%"
    // xs: {
    // m: "auto",
    // pt: "10%"
    // mt: 4,
    // ml: "30%",
    // mr: "33%"
    // }
}
const MyInput = props => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);

    return (
        <>
            {/* <label htmlFor={props.id || props.name}>{label}</label> */}

            {meta.touched && meta.error ? (
                <TextField {...field} {...props} error helperText={meta.error} />
            ) : <TextField {...field} {...props} />
            }
        </>
    );
};
const Login_byUsername = props => {
    console.log('render Login_byUsername.ui')
    return <Box {...container}>
        <Logo width="100px" />
        {/* <Typography variant="h5" gutterBottom>
            Acceder
          </Typography>
        <Typography variant="subtitle1" gutterBottom>
            Usa tu cuenta de google
      </Typography>
        <MyForm>
            <MyInput
                name="username"
                fullWidth
                label="Correo Electrónico"
                variant="outlined"
                type="text"
            />
            <MyInput
                name="password"
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
            />
            <button type="submit">Submit</button>
        </MyForm> */}
    </Box>
}

export default Login_byUsername