import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import Session from 'ui/Session'
import LoadingBackdrop from 'ui/Loading.Backdrop'
import LoadingProgressBar from "ui/Loading.ProgressBar";
import useStorage from "indexContext.useStorege";
import Theme from "indexContext.Theme";
const IndexContext = () => {
    console.log('Render IndexContext')
    const { loading, client } = useStorage()
    if (loading)
        return <LoadingProgressBar />
    else
        return (
            <ApolloProvider client={client}>
                <Theme>
                    <Router>
                        <Session />
                    </Router>
                    <LoadingBackdrop />
                </Theme>
            </ApolloProvider>
        )
}

export default IndexContext