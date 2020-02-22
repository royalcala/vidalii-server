import React from 'react'
import * as Yup from 'yup';
import { useApolloClient } from "@apollo/react-hooks";
import useForm from "ui_fx/useForm";
import { SESSION_GET, SESSION_GET_TOKEN } from 'gql/actions'
import { useBackdrop } from 'ui_resolvers'

const useFormByUsername = () => {
    const client = useApolloClient()
    const backdrop = useBackdrop(client)
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
        onSubmit: async (variables, { setSubmitting }) => {
            setSubmitting(false)
            backdrop(true)
            try {
                let { data } = await client.query({
                    query: SESSION_GET,
                    variables,
                    fetchPolicy: 'no-cache'
                })
                //same effect to writeData
                // client.writeQuery({
                //     query: SESSION_GET_TOKEN,
                //     data: {
                //         token: data.session_get.token,
                //         user: data.session_get.user
                //     }
                // })
                //same effect to writeQuery
                client.writeData({
                    data: {
                        token: data.session_get.token,
                        user: data.session_get.user
                    }
                })
                // console.log('data::', data)
                backdrop(false)
            } catch (error) {
                console.log('%c⧭', 'color: #00b300', error);
                backdrop(false)
            }

        }
    })

    return {
        Form
    }
}

export default useFormByUsername