import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import Session from 'ui/Session'
// import { ApolloClient } from 'apollo-client';
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

// console.log('InMemoryCache::', InMemoryCache)
let count = 0
const cache = new InMemoryCache(
    {
        typePolicies: {
            // Session: {
            //     fields: {
            //         username: {
            //             read(...data) {
            //                 console.log('In cache.Session.username' + count++, data)
            //                 return 'from cache.Session.fields.username'
            //             }
            //         }
            //     },
            // },
            Query: {
                fields: {
                    initialData: {
                        // keyArgs: ["number"],
                        read(...data) {
                            console.log('%c⧭', 'color: #ffcc00',
                                'Query.initialData::', data);
                            return 'from Query.fields.initialData'
                        }
                    },
                    // session_get: {
                    //     read(...data) {
                    //         console.log('in cache.Query.session_get:' + count++, data)
                    //         return {
                    //             // __typename: 'Session',
                    //             id: '1',
                    //             token: 'from cache.Query.session_get' + count,
                    //             username: 'from cache.Query.username'
                    //         }
                    //     }
                    // }

                },
            },
        },
    }
);
// console.log('%c⧭', 'color: #cc0088', cache);
console.log('cache', Object.keys(cache))
// console.log('cache', cache.storeReader)

export const client = new ApolloClient({
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
console.log('client', Object.keys(client))

const storage = {
    setItem: (...data) => {
        console.log('%c⧭', 'color: #00a3cc', 'setItem:', data);

        return window.localStorage.setItem(data[0], data[1])
        // return window.localStorage.setItem('my key', 'my value')
    },
    getItem: (...data) => {
        console.log('%c⧭', 'color: #00a3cc', 'getItem:', data);
        console.log(typeof window.localStorage.getItem(data[0]))
        return window.localStorage.getItem(data[0])

    },
    removeItem: (...data) => {
        console.log('%c⧭', 'color: #00a3cc', 'removeItem:', data);


        return window.localStorage.removeItem(data[0])
    },
    clear: (...data) => {
        console.log('%c⧭', 'color: #00a3cc', 'getItem:', data);

        return window.localStorage.clear()
    }
}

const IndexContext = () => {
    console.log('Render IndexContext')
    const [state, setState] = React.useState(undefined);    
    React.useEffect(() => {
        const initData = {
            initialData: 'initialData from cache.writeData!'
        };
        cache.writeData({ data: initData })
        // See above for additional options, including other storage providers.
        persistCache({
            cache,
            // storage: window.localStorage
            storage
        }).then(() => {            
            client.onResetStore(async () => cache.writeData({ data: initData }));
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