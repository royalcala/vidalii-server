import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import {
    ApolloClient, InMemoryCache,
    HttpLink,
    //  ApolloProvider
} from '@apollo/client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
// import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import resolvers from 'gql/resolvers'
import typeDefs from 'gql/sdl'
import Session from 'ui/Session'




const storage = {
    setItem: (...data) => {
        // console.log('%c⧭', 'color: #00a3cc', 'setItem:', data);
        return window.localStorage.setItem(data[0], data[1])
        // return window.localStorage.setItem('my key', 'my value')
    },
    getItem: (...data) => {
        // console.log('%c⧭', 'color: #00a3cc', 'getItem:', data);
        // console.log(typeof window.localStorage.getItem(data[0]))
        return window.localStorage.getItem(data[0])

    },
    removeItem: (...data) => {
        // console.log('%c⧭', 'color: #00a3cc', 'removeItem:', data);
        return window.localStorage.removeItem(data[0])
    },
    clear: (...data) => {
        // console.log('%c⧭', 'color: #00a3cc', 'getItem:', data);
        return window.localStorage.clear()
    }
}

const IndexContext = () => {
    console.log('Render IndexContext')
    const [state, setState] = React.useState(undefined);
    React.useEffect(() => {
        console.log('initial data')
        const cache = new InMemoryCache()

        const client = new ApolloClient({
            cache,
            link: new HttpLink({
                uri: 'http://localhost:4000/graphql',
                headers: {
                    authorization: localStorage.getItem('token'),
                    'client-name': 'Space Explorer [web]',
                    'client-version': '1.0.0',
                },
            }),
            resolvers,
            typeDefs,
        });
        const initData = {
            token: null,
            user: null
        };
        cache.writeData({ data: initData })
        const namePersistCache = 'persist-storage-vidalii'
        persistCache({
            key: namePersistCache,
            cache,
            // storage: window.localStorage
            storage
        }).then(() => {
            client.onResetStore(async () => {
                localStorage.removeItem(namePersistCache);
                cache.writeData({ data: initData })
            });
            setState(client);
        });
        return () => { };
    }, []);
    if (state === undefined)
        return <div>loading...</div>
    else
        return (
            // <ApolloProvider client={client}>
            <ApolloProvider client={state}>
                <Router>
                    <Session />
                </Router>
            </ApolloProvider>
        )
}

export default IndexContext