import React from 'react'
import { useField } from 'formik';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ReactComponent as Logo } from 'svg/google.svg';
import useForm from "ui_fx/Login.userForm.ByUsername"


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: "100%",
        },
    },
}));

const MyInput = props => {
    const [field, meta] = useField(props);
    return (
        <>
            {meta.touched && meta.error ? (
                <TextField {...field} {...props} error helperText={meta.error} />
            ) : <TextField {...field} {...props} />
            }
        </>
    );
};

const LoginByUsername = props => {
    console.log('render LoginByUsername.ui')
    const { Form } = useForm()
    const classes = useStyles()

    return (
        <>
            <Logo width="100px" />
            <Typography variant="h5" gutterBottom>
                Acceder
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Usa tu cuenta de google
            </Typography>
            <Form className={classes.root}>
                <MyInput
                    name="username"
                    label="Correo Electrónico"
                    variant="outlined"
                    type="text"
                    autoFocus
                />
                <MyInput
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                />
                <Button type="submit" variant="contained" color="primary">Siguiente</Button>
                <br />
                <Link to="/recovery">Recover your password</Link>
            </Form >
        </>
    )
}
export default LoginByUsername