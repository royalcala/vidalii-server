import React from 'react'
import { Formik, Form } from 'formik';

const useForm = ({ initialValues, validationSchema, onSubmit }) => {
    console.log('render FormByUsername.. check dont re-render')
    const propsFormik = {
        initialValues,
        validationSchema,
        onSubmit
    }

    return {
        Form: props => (
            <Formik {...propsFormik}>
                <Form>{props.children}</Form>
            </Formik>
        )
    }
}
export default useForm