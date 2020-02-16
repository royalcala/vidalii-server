import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import stateSession from 'localState/session'

const FormByUsername = props => {
    console.log('render state login by username')
    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}

            validationSchema={Yup.object({
                username: Yup.string()
                    .email('Wrong email. myemail@domain.com')
                    .required('Requerido'),
                password: Yup.string().required('The Password is required'),
            })}

            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                stateSession.setSession(values)
                // if (values.username === 'a@a.com')
                //     if (values.password === 'p')
                //         setTimeout(() => {
                //             alert(JSON.stringify(values, null, 2));
                //         }, 400);
            }}
        >
            <Form>
                {props.children}
            </Form>
        </Formik>
    );
};

export default FormByUsername