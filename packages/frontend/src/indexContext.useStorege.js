import React from 'react'
import {
    ApolloClient, InMemoryCache,
    HttpLink,
} from '@apollo/client';
import { persistCache } from 'apollo-cache-persist';
import resolvers from 'gql/resolvers'
import typeDefs from 'gql/sdl'

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
const initData = {
    token: null,
    user: null,
    ui_loading_backdrop: false
};
export default function Storage() {
    const [state, setState] = React.useState({ loading: true });
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
            setState({ client });
        });
        return () => { };
    }, []);

    return state
}