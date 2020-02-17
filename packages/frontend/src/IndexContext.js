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


let count = 0
export const cache = new InMemoryCache(
    {
        typePolicies: {
            Session: {
                fields: {
                    username: {
                        read(...data) {
                            console.log('In cache.Session.username' + count++, data)
                            return 'from Session.fields.username'
                        }
                    }
                },
            },
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
                    session_get: {
                        read(...data) {
                            console.log('in cache.Query.session_get:' + count++, data)
                            return {
                                // __typename: 'Session',
                                token: 'from cache.Query.session_get' + count,
                                username: 'from cache.Query.username'
                            }
                        }
                    }

                },
            },
        },
    }
);
console.log('%c⧭', 'color: #cc0088', cache);
console.log('cache', Object.keys(cache))
console.log('cache', cache.storeReader)




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
// console.log(client.store.cache.data)
// console.log(Object.keys(client.store.cache.data))
cache.writeData({
    data: {
        initialData: 'fro initial cache hello world!',
        // session_get: 'from initial cache'
        // isLoggedIn: !!localStorage.getItem('token'),
        // Session: {
        //     has: false
        // },
        // cartItems: [],
    },
});

const IndexContext = () => {
    console.log('Render IndexContext')
    // const [persistData, setClient] = useState(undefined);
    // console.log('%c⧭', 'color: #735656', persistData);
    // useEffect(() => {
    //     // const initData = {
    //     //     {/* your initial data */}
    //     //   };
    //     // See above for additional options, including other storage providers.
    //     persistCache({
    //         cache,
    //         storage: window.localStorage
    //     }).then(() => {
    //         // client.onResetStore(async () => cache.writeData({ data: initData }));
    //         setClient(client);
    //     });
    //     return () => { };
    // }, []);

    return (
        <ApolloProvider client={client}>
            <Router>
                <Session />
            </Router>
        </ApolloProvider>
    )
}

export default IndexContext