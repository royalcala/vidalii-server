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
// initCache()
// function initCache() {
//     const { writeData, mutate, writeQuery, writeFragment, read, readFragment, readQuery
//     } = cache

//     cache.writeData = function (...data) {
//         console.log('in cache.writeData2 before', data)
//         writeData.apply(this, data);
//         console.log('in cache.writeData after')
//     }
//     cache.mutate = function (...data) {
//         console.log('in cache.mutate before', data)
//         mutate.apply(this, data);
//         console.log('in cache.mutate after')
//     }
//     cache.writeQuery = function (...data) {
//         console.log('in cache.writeQuery before', data)
//         writeQuery.apply(this, data);
//         console.log('in cache.writeQuery after')
//     }

//     cache.writeFragment = function (...data) {
//         console.log('in cache.writeFragment before', data)
//         writeFragment.apply(this, data);
//         console.log('in cache.writeFragment after')
//     }

//     cache.read = function (...data) {
//         console.log('in cache.read before', data)
//         read.apply(this, data);
//         console.log('in cache.read after')
//     }

//     cache.readFragment = function (...data) {
//         console.log('in cache.readFragment before', data)
//         readFragment.apply(this, data);
//         console.log('in cache.readFragment after')
//     }

//     cache.readQuery = function (...data) {
//         console.log('in cache.readQuery before', data)
//         readQuery.apply(this, data);
//         console.log('in cache.readQuery after')
//     }
// }




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
    // defaultOptions: {
    //     query: (...data) => {
    //         console.log('******defaultOptions:', data)
    //     },
    //     mutate: (...data) => {
    //         console.log('******defaultOptions:', data)
    //     },
    //     watchQuery: {
    //         fetchPolicy: 'cache-and-network',
    //     },
    // },
});
console.log('client', Object.keys(client))

// initClient()
// function initClient() {
//     const { writeData, mutate, writeQuery, writeFragment, read, readFragment, readQuery
//     } = client

//     client.writeData = function (...data) {
//         console.log('in client.writeData before', data)
//         writeData.apply(this, data);
//         console.log('in client.writeData after')
//     }
//     client.mutate = function (...data) {
//         console.log('in client.mutate before', data)
//         mutate.apply(this, data);
//         console.log('in client.mutate after')
//     }
//     client.writeQuery = function (...data) {
//         console.log('in client.writeQuery before', data)
//         writeQuery.apply(this, data);
//         console.log('in client.writeQuery after')
//     }

//     client.writeFragment = function (...data) {
//         console.log('in client.writeFragment before', data)
//         writeFragment.apply(this, data);
//         console.log('in client.writeFragment after')
//     }

//     client.read = function (...data) {
//         console.log('in client.read before', data)
//         read.apply(this, data);
//         console.log('in client.read after')
//     }

//     client.readFragment = function (...data) {
//         console.log('in client.readFragment before', data)
//         readFragment.apply(this, data);
//         console.log('in client.readFragment after')
//     }

//     client.readQuery = function (...data) {
//         console.log('in client.readQuery before', data)
//         readQuery.apply(this, data);
//         console.log('in client.readQuery after')
//     }
// }

// initClientCache()
// function initClientCache() {
//     const { writeData, mutate, writeQuery, writeFragment, read, readFragment, readQuery
//     } = client.localState

//     client.writeData = function (...data) {
//         console.log('in client.writeData before', data)
//         writeData.apply(this, data);
//         console.log('in client.writeData after')
//     }
//     client.mutate = function (...data) {
//         console.log('in client.mutate before', data)
//         mutate.apply(this, data);
//         console.log('in client.mutate after')
//     }
//     client.writeQuery = function (...data) {
//         console.log('in client.writeQuery before', data)
//         writeQuery.apply(this, data);
//         console.log('in client.writeQuery after')
//     }

//     client.writeFragment = function (...data) {
//         console.log('in client.writeFragment before', data)
//         writeFragment.apply(this, data);
//         console.log('in client.writeFragment after')
//     }

//     client.read = function (...data) {
//         console.log('in client.read before', data)
//         read.apply(this, data);
//         console.log('in client.read after')
//     }

//     client.readFragment = function (...data) {
//         console.log('in client.readFragment before', data)
//         readFragment.apply(this, data);
//         console.log('in client.readFragment after')
//     }

//     client.readQuery = function (...data) {
//         console.log('in client.readQuery before', data)
//         readQuery.apply(this, data);
//         console.log('in client.readQuery after')
//     }
// }
// const { mutate, writeQuery, writeData } = client
// client.mutate = function (...data) {
//     console.log('in client.mutate before', data)
//     mutate.apply(this, data);
//     console.log('in client.mutate after')
// }
// client.writeQuery = function (...data) {
//     console.log('in client.writeQuery before', data)
//     writeQuery.apply(this, data);
//     console.log('in client.writeQuery after')
// }
// client.writeData = function (...data) {
//     console.log('in client.writeData before', data)
//     writeData.apply(this, data);
//     console.log('in client.writeData after')
// }
// console.log(client.store.cache.data)
// console.log(Object.keys(client.store.cache.data))
// cache.writeData({
//     data: {
//         initialData: 'fro initial cache hello world!',
//         // session_get: 'from initial cache'
//         // isLoggedIn: !!localStorage.getItem('token'),
//         // Session: {
//         //     has: false
//         // },
//         // cartItems: [],
//     },
// });


const IndexContext = () => {
    console.log('Render IndexContext')
    const [state, setState] = React.useState(undefined);
    // console.log('%c⧭', 'color: #735656', persistData);
    React.useEffect(() => {
        const initData = {
            initialData: 'initialData from cache.writeData!'
        };
        cache.writeData({ data: initData })
        // See above for additional options, including other storage providers.
        persistCache({
            cache,
            // storage: window.localStorage
            storage: {
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
        }).then(() => {
            // console.log('then')
            // client.onResetStore(async () => cache.writeData({ data: initData }));
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