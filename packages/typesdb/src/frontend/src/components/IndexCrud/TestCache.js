import React from 'react';
// import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { cache } from '../../App'

const readQuery = () => {
    try {
        let data = cache.readQuery({
            query: gql`
              query TestCache {
                isLoggedIn
              }
            `,
        })

        console.log(data)
    } catch (error) {
        console.log('error::', error)
    }

};
export default () => {

    return (
        <button onClick={readQuery}>readQuery</button>
    )
}