import React from 'react'
import { Formik, Form } from 'formik';
// import FormControl from '@material-ui/core/FormControl';
const useForm = ({ initialValues, validationSchema, onSubmit }) => {
    console.log('render FormByUsername.. check dont re-render')
    const propsFormik = {
        initialValues,
        validationSchema,
        onSubmit
    }

    return {
        Form: ({ children, ...others }) => (
            <Formik {...propsFormik} >
                <Form {...others}>{children}</Form>
            </Formik>
        )
    }
}
export default useForm