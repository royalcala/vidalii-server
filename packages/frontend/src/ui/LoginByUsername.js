import React from 'react'
import { useField } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { useLazyQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useForm from "forms/login.byUsername";
import { ReactComponent as Logo } from 'svg/google.svg';
import { SESSION_GET } from 'gql/actions'

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
    const [session_get, { loading, data }] = useLazyQuery(SESSION_GET);
    console.log('%c⧭', 'color: #917399', '****loading:::', loading);
    const { Form } = useForm({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .email('Wrong email. myemail@domain.com')
                .required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: (value, { setSubmitting }) => {
            setSubmitting(false)
            session_get({ variables: value })
        }
    })

    return (
        <>
            <Logo width="100px" />
            <Typography variant="h5" gutterBottom>
                Acceder
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Usa tu cuenta de google
            </Typography>
            <Form >
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
                <br />
                <Link to="/recovery">Recover your password</Link>
            </Form >
        </>
    )
}
// const LoginByUsername = props => {
//     console.log('render LoginByUsername.ui')    
//     const [session_get, { loading, data }] = useLazyQuery(SESSION_GET);
//     console.log('%c⧭', 'color: #aa00ff', data);
//     console.log('%c⧭', 'color: #00a3cc', loading);
//     console.log('%c⧭', 'color: #00e600', session_get);
//     return (
//         <>
//             <Logo width="100px" />
//             <Typography variant="h5" gutterBottom>
//                 Acceder
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//                 Usa tu cuenta de google
//             </Typography>
//             <FormByUsername >
//                 <MyInput
//                     name="username"
//                     fullWidth
//                     label="Correo Electrónico"
//                     variant="outlined"
//                     type="text"
//                 />
//                 <MyInput
//                     name="password"
//                     fullWidth
//                     label="Password"
//                     variant="outlined"
//                     type="password"
//                 />
//                 <button type="submit">Submit</button>
//                 <br />
//                 <Link to="/recovery">Recover your password</Link>
//             </FormByUsername >
//         </>
//     )
// }

export default LoginByUsername