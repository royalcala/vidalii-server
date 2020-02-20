import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { client } from 'IndexContext'
import { SESSION_SET, SESSION_GET } from 'gql/actions'
// import stateSession from 'localState/session'
// import { useMutation } from '@apollo/client';
// client
//   .query({
//     query: gql`
//       {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

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

            onSubmit={async (values, { setSubmitting }) => {
                console.log('In Form byUsername2')
                setSubmitting(false)

                let session1 = await client.query({
                    query: SESSION_GET
                })
                console.log(session1)
                console.log(client.query)
                console.log(client.mutate)
                let validationCredentials = await client.mutate({
                    mutation: SESSION_SET,
                    variables: values
                })
                console.log('%c⧭', 'color: #1d3f73', validationCredentials);
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