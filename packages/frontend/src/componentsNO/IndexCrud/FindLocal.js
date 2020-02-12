import React from 'react';
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// const IS_LOGGED_IN = gql`
//   query FindLocal @client{
//     isLoggedIn
//   }
// `;
//OR
export const IS_LOGGED_IN = gql`
  query FindLocal{
    isLoggedIn @client
  }
`;

export default function IsLoggedIn() {
    console.log(' FindLocal.js')
    const { data } = useQuery(IS_LOGGED_IN);
    console.log('data::', data)
    return (<div>{JSON.stringify(data)}</div>)
}