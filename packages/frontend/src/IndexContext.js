import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import Session from 'ui/Session'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import resolvers from 'gql/resolvers'
import typeDefs from 'gql/typeDefs'

const cache = new InMemoryCache();

const client = new ApolloClient({
    cache,
    // link: new HttpLink({
    //     uri: 'http://localhost:4000/graphql',
    //     headers: {
    //         authorization: localStorage.getItem('token'),
    //         'client-name': 'Space Explorer [web]',
    //         'client-version': '1.0.0',
    //     },
    // }),
    resolvers,
    typeDefs,
});

cache.writeData({
    data: {
        // isLoggedIn: !!localStorage.getItem('token'),
        isLoggedIn: false,
        cartItems: [],
    },
});

const IndexContext = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Session />
            </Router>
        </ApolloProvider>
    )
}

export default IndexContext